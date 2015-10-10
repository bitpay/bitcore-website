'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var mkdirp = require('mkdirp');
var getDirName = require('path').dirname;
var runSequence = require('run-sequence');
var fs = require('fs');
var globby = require('globby');
var async = require('async');
var uglifyJS = require('uglify-js');
var jademinSrcs = {};

gulp.task('jade', function() {
  return gulp.src(['src/**/*.jade', '!src/_**/*.jade'])
    .pipe($.cached('jade'))
    .pipe($.plumber())
    .pipe($.jade({
      pretty: (gulp.environment.development === true),
      locals: {
        getObjectFromJson: getObjectFromJson,
        jademin: jademinMixin
      }
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('rebuild-jade', function(cb) {
  runSequence('jade', 'jademin-uglify', cb);
});

gulp.task('uncached-rebuild-jade', function(cb) {
  delete $.cached.caches.jade;
  runSequence('rebuild-jade', cb);
});

gulp.task('jademin-uglify', function(cb) {
  var outputPaths = [];
  var job = {};
  for (var outputPath in jademinSrcs) {
    outputPaths.push(outputPath);
    job[outputPath] = [];
    for (var inputPath in jademinSrcs[outputPath]) {
      job[outputPath][inputPath] =
      '{components,src}' + jademinSrcs[outputPath][inputPath];
    }
  }
  async.each(outputPaths, function(name, cb2) {
    var scriptPaths = globby.sync(job[name]);
    var srcMapName = name + '.map';
    var contents = uglifyJS.minify(scriptPaths, {
      outSourceMap: srcMapName,
      sourceRoot: '../',
      // warnings: true
    });
    async.parallel([
      function(cb3) {
        writeFile('dist' + name, contents.code, cb3);
      },
      function(cb3) {
        writeFile('dist' + srcMapName, contents.map, cb3);
      }
    ], function(err) {
      if (err) {
        console.log('Jademin: File write failed - ' + err);
      }
      cb2();
    });
  }, function(err) {
    if (err) {
      console.log('Jademin: Uglify failed - ' + err);
    }
    cb();
  });
});

function getObjectFromJson(path) {
  return JSON.parse(String(fs.readFileSync(path)));
}

function jademinMixin(block, path) {
  var functionString = block.toString();
  var regex = /src=\\"(.*?)\\"/g;
  var matches = getMatches(functionString, regex);
  if (typeof jademinSrcs[path] === 'undefined') {
    jademinSrcs[path] = matches;
  } else {
    if (!arraysEqual(jademinSrcs[path], matches)) {
      throw new Error('Jademin: path "' + path + '" is already taken. ' +
      'Did you add a new script? Try restarting the node process.');
    }
  }
}

function writeFile(path, contents, cb) {
  mkdirp(getDirName(path), function(err) {
    if (err) {
      return cb(err);
    }
    fs.writeFile(path, contents, cb);
  });
}

function arraysEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (a === null || b === null) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

function getMatches(string, regex) {
  var results = [];
  var match;
  while (!!(match = regex.exec(string))) {
    results.push(match[1]);
  }
  return results;
}
