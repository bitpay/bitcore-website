'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var path = require('path');

//add hashes to filenames to bust caches, write rev-manifest.json
gulp.task('hash', function() {
  $.revAllInstance = new $.revAll({
    dontRenameFile: [/^\/favicon.ico$/g, '.html'],
    fileNameVersion: 'version.json'
  });
  return gulp.src(
      ['dist/**/*.html',
        'dist/**/*.css',
        'dist/**/*.js',
        'dist/images/**/*'
      ], {
        base: path.join(process.cwd(), 'dist')
      })
    .pipe($.revAllInstance.revision())
    .pipe(gulp.dest('dist'))
    .pipe($.revAllInstance.versionFile())
    .pipe(gulp.dest('dist'));
});
