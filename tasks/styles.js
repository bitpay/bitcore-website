'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

// Compile & autoprefix styles
gulp.task('sass', function() {
  var AUTOPREFIXER_BROWSERS = [
    'ie >= 8',
    'ff >= 30',
    'chrome >= 31',
    'safari >= 5.1',
    'opera >= 23',
    'ios >= 7',
    'android >= 4',
    '> 0.25%' //of global market share
  ];

  // For best performance, don't add partials to `gulp.src`
  return gulp.src([
      'src/styles/**/*.scss'
    ])
    .pipe($.if(gulp.environment.development, $.sourcemaps.init()))
    .pipe($.sass({
      outputStyle: 'expanded',
      precision: 10,
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.if(gulp.environment.development, $.sourcemaps.write()))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('styles', function() {
  return gulp.src(['dist/styles/*.css'])
    .pipe($.csso())
    .pipe(gulp.dest('dist'));
});

gulp.task('rebuild-styles', function(cb) {
  runSequence('sass', 'styles', cb);
});
