'use strict';

var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();

var repos = [
  'bitpay/bitcore-channel',
  'bitpay/bitcore-ecies',
  'bitpay/bitcore-explorers',
  'bitjson/bitcore-lib',
  'bitpay/bitcore-message',
  'bitpay/bitcore-mnemonic',
  'bitpay/bitcore-node',
  'bitpay/bitcore-p2p',
  'bitpay/bitcore-payment-protocol'
];

gulp.task('update-generated-markdown', function(cb) {
  runSequence(['update-repo-sources'], ['rebuild-generated-markdown'],
    cb);
});

gulp.task('update-repo-sources', ['delete-downloads'], function(cb) {
  runSequence(['mkdir-downloads'], ['download-repos'], ['extract-repo-contents'], ['delete-tgzs'], cb);
});

gulp.task('rebuild-generated-markdown', ['delete-generated'], function(cb) {
  runSequence(['copy-docs'], ['extract-jsdocs'],
    cb);
});

var downloadCmds = repos.map(function(repo) {
  return 'cd downloads/tgzs; npm pack ' + repo;
});

gulp.task('mkdir-downloads', $.shell.task('mkdir downloads; mkdir downloads/tgzs;'));
gulp.task('download-repos', $.shell.task(downloadCmds));

gulp.task('extract-repo-contents', function() {
  return gulp.src('downloads/tgzs/*.tgz', {
      base: './'
    })
    .pipe($.debug())
    .pipe($.rename(function(path) {
      path.dirname = path.basename.slice(0, path.basename.lastIndexOf('-'));
    }))
    .pipe($.gunzip())
    .pipe($.untar())
    .pipe($.rename(function(path) {
      path.dirname = path.dirname.replace('/package', '');
    }))
    .pipe(gulp.dest('downloads/extracted'));
});

gulp.task('copy-docs', function() {
  return gulp.src('downloads/extracted/**/*.md', {
      base: './downloads/extracted'
    })
    .pipe(gulp.dest('generated'));
});

gulp.task('extract-jsdocs', function() {
  console.log('generating markdown from jsdocs, this may take a minute...');
  return gulp.src('downloads/extracted/*/lib/**/*.js', {
      base: './downloads/extracted'
    })
    .pipe($.jsdocToMarkdown())
    .pipe($.rename(function(path) {
      path.extname = '.md';
    }))
    .pipe(gulp.dest('generated'));
});

gulp.task('delete-generated', function() {
  return del(['generated']);
});
gulp.task('delete-tgzs', function() {
  return del(['downloads/tgzs']);
});
gulp.task('delete-downloads', function() {
  return del(['downloads']);
});
