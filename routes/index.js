var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express we' });
});
// router.get('/datariver/views/index.html', function(req,res,next){
//   res.redirect('index.html');
// })

module.exports = router;
