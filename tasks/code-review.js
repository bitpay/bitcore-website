'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

gulp.task('code-review', function(cb) {
  runSequence(['jscs-jshint', 'scss-lint'], cb);
});

gulp.task('jscs-jshint', function() {
  return gulp.src([
      './*.js',
      './tasks/*.js',
      './src/**/*.js'
    ], {
      base: './'
    })
    .pipe($.cached('jscs-jshint'))
    .pipe($.jscs({
      fix: true
    }))
    .pipe($.jscs.reporter())
    .pipe($.if(!gulp.environment.development, $.jscs.reporter('fail')))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!gulp.environment.development, $.jshint.reporter('fail')))
    // save jscs fixes
    .pipe(gulp.dest('.'));
});

gulp.task('scss-lint', function() {
  return gulp.src([
      './src/_styles/**/*.scss',
      './src/styles/**/*.scss',
      '!./src/_styles/_shame.scss'
    ])
    .pipe($.cached('scss-lint'))
    .pipe($.sassLint())
    .pipe($.sassLint.format())
    .pipe($.if(!gulp.environment.development, $.sassLint.failOnError()));
});
