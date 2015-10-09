'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var path = require('path');
var runSequence = require('run-sequence');
var env = {};
var devDeps = {};

function loadBrowserSync() {
  devDeps.browserSync = require('browser-sync');
  devDeps.reload = devDeps.browserSync.reload;
}

gulp.task('default', ['build'], function(cb) {
  runSequence('hash', cb);
});

gulp.task('build', ['delete'], function(cb) {
  env.development = true;
  loadBrowserSync();
  runSequence(
    ['sass', 'jade:dev', 'images', 'copy', 'jscs-jshint'],
    ['styles', 'jademin-uglify'],
    cb);
});

// Watch for changes & reload
gulp.task('serve', ['build'], function() {
  devDeps.browserSync({
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

  gulp.watch(['src/_**/*.jade'],
    ['uncached-rebuild-jade', devDeps.reload]);
  gulp.watch(['src/**/*.jade', '!src/_**/*.jade', 'src/**/*.html'],
    ['rebuild-jade', devDeps.reload]);
  gulp.watch(['src/{_styles,styles}/**/*.{scss,css}'],
    ['rebuild-styles', devDeps.reload]);
  gulp.watch(['*.js', 'tasks/*.js', 'src/**/*.js'],
    ['jscs-jshint', devDeps.reload]);
  gulp.watch(['src/images/**/*'],
    ['images', devDeps.reload]);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function() {
  loadBrowserSync();
  devDeps.browserSync({
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

gulp.task('rebuild-jade', function(cb) {
  runSequence('jade:dev', 'jademin-uglify', cb);
});

gulp.task('rebuild-styles', function(cb) {
  runSequence('sass', 'styles', cb);
});

gulp.task('delete', function() {
  return del(['dist']);
});

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
    .pipe($.if(env.development, $.sourcemaps.init()))
    .pipe($.sass({
      outputStyle: 'expanded',
      precision: 10,
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.if(env.development, $.sourcemaps.write()))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('styles', function() {
  return gulp.src(['dist/**/*.css'])
    .pipe($.csso())
    .pipe(gulp.dest('dist'));
});

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

// Copy files at root level of 'src' to dist
gulp.task('copy', function() {
  return gulp.src(['src/*', '!src/_*', '!src/*.jade'], {
      dot: true
    })
    .pipe($.cached('copy'))
    .pipe(gulp.dest('dist'));
});

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
     'dist/images/**/*'], {
      base: path.join(process.cwd(), 'dist')
    })
    .pipe($.revAllInstance.revision())
    .pipe(gulp.dest('dist'))
    .pipe($.revAllInstance.versionFile())
    .pipe(gulp.dest('dist'));
});

gulp.task('jscs-jshint', function() {
  return gulp.src(
      ['./*.js',
       './tasks/*.js',
       './src/**/*.js'],
      {base: './'})
    .pipe($.cached('jscs-jshint'))
    .pipe($.jscs({
      fix: true
    }))
    .pipe($.jscs.reporter())
    .pipe($.if(!(devDeps.browserSync && devDeps.browserSync.active),
      $.jscs.reporter('fail')))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!(devDeps.browserSync && devDeps.browserSync.active),
      $.jshint.reporter('fail')))
    // save jscs fixes
    .pipe(gulp.dest('.'));
});

// Load custom tasks from the `tasks` directory
var tasks;
try {
  tasks = require('require-dir')('tasks');
} catch (err) {
  console.error(err);
}
