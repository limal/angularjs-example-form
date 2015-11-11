var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    rename = require("gulp-rename"),
    sass = require('gulp-sass');

var browserSync = require('browser-sync').create();

var onError = function(err) {
    console.log('An error occurred:', err.message);
    this.emit('end');
}

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("assets/scss/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("assets/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("assets/css"))
        .pipe(minifycss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("assets/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
