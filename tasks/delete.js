'use strict';

var gulp = require('gulp');
var del = require('del');

gulp.task('delete', function() {
  return del(['dist']);
});
