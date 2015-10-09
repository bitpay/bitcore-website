'use strict';

var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var $ = require('gulp-load-plugins')();

var repos = [
  'bitcore',
  'bitcore-channel',
  'bitcore-ecies',
  'bitcore-explorers',
  'bitcore-message',
  'bitcore-mnemonic',
  'bitcore-p2p',
  'bitcore-payment-protocol'
];

gulp.task('generate-markdown', ['delete-generated'], function(cb) {
  runSequence(['copy-docs', 'extract-jsdocs'], cb);
});

var docsPaths = repos.map(function(repo) {
  return 'node_modules/' + repo + '/**/*.md';
});

gulp.task('copy-docs', function() {
  return gulp.src(docsPaths.concat('!node_modules/**/node_modules/**'), {
      base: 'node_modules/'
    })
    .pipe(gulp.dest('generated'));
});

var jsdocPaths = repos.map(function(repo) {
  return 'node_modules/' + repo + '/lib/**/*.js';
});

gulp.task('extract-jsdocs', function() {
  return gulp.src(jsdocPaths, {
      base: 'node_modules/'
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
