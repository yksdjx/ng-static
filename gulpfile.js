var gulp = require('gulp');
var symlink = require('gulp-symlink');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var pkg = require('./package.json');
var links = pkg.config.links;

gulp.task("node", function () {
    nodemon({
        script: './bin/www',
        ext: 'js html',
        env: {
            'NODE_ENV': 'development'
        }
    })
});
gulp.task('server',  gulp.series("node", function () {
    var files = ['view/**/*.html', 'view/**/*.ejs', 'view/**/*.jade', 'public/**/*.*', 'routes/*.*', ];
    //gulp.run(["node"]);   
    browserSync.init(files, {
        proxy: 'http://localhost:3000',
        browser: 'chrome',
        notify: false,
        port: 4001
    });
    gulp.watch(files).on("change", reload);
}));
gulp.task('symlink', function(){
    return gulp.src([links[0].view, links[0].ds])
        .pipe(symlink(["./view", "./public/ds"],{force: true}));
});