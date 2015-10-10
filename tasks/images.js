'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe($.cached('images'))
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({
      title: 'images'
    }));
});
