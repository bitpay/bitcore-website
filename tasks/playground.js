'use strict';

var gulp = require('gulp');

gulp.task('playground', function() {
  gulp.src('components/playground/**', {
    base: 'components/playground/app/'
  }).pipe(gulp.dest('dist/playground'));
});
