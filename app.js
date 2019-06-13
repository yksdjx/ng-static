var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var proxy = require('http-proxy-middleware');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const restream = function(proxyReq, req, res, options) {
  if (req.body) {
      let bodyData = JSON.stringify(req.body);
      // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
      proxyReq.setHeader('Content-Type','application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      // stream the content
      proxyReq.write(bodyData);
  }
}
//app.use(express.static(path.join(__dirname, 'view')));

 //将服务器代理到http://192.168.182.239:61000端口上[本地服务器为localhost:3000]
const apiProxy = proxy('/api', { 
  target: 'http://10.155.200.219:61006/ds',
  changeOrigin: true,
  onProxyReq: restream,
});
const apiMockProxy = proxy('/mock', { 
  target: 'http://192.168.144.102:7300/mock/5cdba7ce7244e64573de9294/',
  changeOrigin: true,
  onProxyReq: restream,
});
app.use(apiProxy);
app.use(apiMockProxy);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
