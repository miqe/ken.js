var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('watch', [], function (done) {
    browserSync.reload();
    done();
});

gulp.task('default', [], function () {

    browserSync.init({
        server: {
            baseDir: "./",
            index : './example/index.html'
        }
    });
    gulp.watch("ken.js/*.js", ['watch']);
});