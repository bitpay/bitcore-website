'use strict';

var gulp = require('gulp');
gulp.environment = {};
gulp.devDeps = {};

var runSequence = require('run-sequence');

gulp.task('default', function(cb) {
  runSequence('build', 'hash', cb);
});

gulp.task('serve', function(cb) {
  gulp.environment.development = true;
  runSequence('watch', cb);
});

gulp.task('build', ['delete'], function(cb) {
  runSequence(
    [
      'code-review'
    ], [
      'sass',
      'jade',
      'images',
      'copy',
    ], [
      'styles',
      'jademin-uglify'
    ],
    cb);
});

// Load tasks from the `tasks` directory
var tasks;
try {
  tasks = require('require-dir')('tasks');
} catch (err) {
  console.error(err);
}
