'use strict';

var gulp = require('gulp');

// Watch for changes & reload
gulp.task('watch', ['build'], function() {
  loadBrowserSync();
  gulp.devDeps.browserSync({
    notify: false,
    logPrefix: 'serve',
    minify: false,
    snippetOptions: {
      rule: {
        fn: function(snippet, match) {
          snippet = snippet.replace('async', 'async data-no-instant');
          return snippet + match;
        }
      }
    },
    server: {
      //serve from dist, fall back to sources (for sourcemaps)
      baseDir: ['dist', 'components', 'src', '.'],
      serveStaticOptions: {
        extensions: 'html'
      }
    }
  });

  // Jade templates and partials
  gulp.watch([
    'src/_**/*.jade',
    'src/**/*.md'
  ], [
    'uncached-rebuild-jade',
    gulp.devDeps.reload
  ]);

  // Page sources
  gulp.watch([
    'src/**/*.jade',
    '!src/_**/*.jade',
    'src/**/*.html'
  ], [
    'rebuild-jade',
    gulp.devDeps.reload
  ]);

  // Scss
  gulp.watch([
    'src/{_styles,styles}/**/*.{scss,css}'
  ], [
    'scss-lint',
    'rebuild-styles',
    gulp.devDeps.reload
  ]);

  // Javascript
  gulp.watch([
    '*.js',
    'tasks/*.js',
    'src/**/*.js'
  ], [
    'jscs-jshint',
    'jademin-uglify',
    gulp.devDeps.reload
  ]);

  // Images
  gulp.watch([
    'src/images/**/*'
  ], [
    'images', gulp.devDeps.reload
  ]);

  // Playground
  gulp.watch([
    'components/bitcore-playground/**/*'
  ], [
    'playground', gulp.devDeps.reload
  ]);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function() {
  loadBrowserSync();
  gulp.devDeps.browserSync({
    notify: false,
    logPrefix: 'serve:dist',
    https: true,
    server: {
      baseDir: 'dist',
      serveStaticOptions: {
        extensions: 'html'
      }
    }
  });
});

function loadBrowserSync() {
  gulp.devDeps.browserSync = require('browser-sync');
  gulp.devDeps.reload = gulp.devDeps.browserSync.reload;
}
