'use strict';

var express = require('express');
var redirects = require('./redirects.json');
var compression = require('compression');
var errorHandler = require('express-error-handler');
var handler = errorHandler({
    static: {
      '404': 'dist/404.html'
    }
  });

var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(compression());

app.get('*', function(req, res, next) {
  console.log(req.url);
  if (typeof redirects[req.url] !== 'undefined') {
    // permenantly redirect paths in redirects.json
    res.redirect(301, redirects[req.url]);
  } else if (req.url === '/guide' || req.url === '/guide/') {
    res.redirect('/start');
  } else {
    next();
  }
});

app.use(express.static(__dirname + '/dist', {
  extensions: 'html'
}));
app.use(errorHandler.httpError(404));
app.use(handler);
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
