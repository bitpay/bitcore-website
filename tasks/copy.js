'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// Copy files at root level of 'src' to dist
gulp.task('copy', function() {
  return gulp.src(['src/*', '!src/_*', '!src/*.jade'], {
      dot: true
    })
    .pipe($.cached('copy'))
    .pipe(gulp.dest('dist'));
});

// Copy files at root level of 'src' to dist
gulp.task('playground', function() {
  return gulp.src(['node_modules/bitcore-playground/app/**'])
    .pipe(gulp.dest('dist/playground'));
});
