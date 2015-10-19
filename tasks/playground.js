'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

gulp.task('playground:bower', function() {
  return $.bower({
    cwd: './node_modules/bitcore-playground'
  });
});

gulp.task('playground:copy', function() {
  gulp.src('node_modules/bitcore-playground/app/**', {
    base: 'node_modules/bitcore-playground/app/'
  }).pipe(gulp.dest('dist/playground'));
});

gulp.task('playground', function(cb) {
  runSequence(
    ['playground:bower'], ['playground:copy'], cb);
});
