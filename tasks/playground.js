'use strict';

var gulp = require('gulp');

gulp.task('playground', function() {
  gulp.src('components/bitcore-playground/**', {
    base: 'components/bitcore-playground/'
  }).pipe(gulp.dest('dist/playground'));
});
