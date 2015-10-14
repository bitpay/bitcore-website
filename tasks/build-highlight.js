'use strict';

var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('copy-highlight-js', ['delete-highlightjs-build'], function(cb) {
  runSequence(['copy-highlight-build-js', 'copy-highlight-build-css'], cb);
});

gulp.task('copy-highlight-build-js', function() {
  return gulp.src(['node_modules/highlight.js/build/highlight.pack.js'])
    .pipe(gulp.dest('components/highlight.js'));
});

gulp.task('copy-highlight-build-css', function() {
  return gulp.src(['node_modules/highlight.js/build/demo/styles/*.css'])
    .pipe(gulp.dest('components/highlight.js/styles'));
});

gulp.task('delete-highlightjs-build', function() {
  return del(['components/highlight.js']);
});
