'use strict';

var express = require('express');
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
app.use(express.static(__dirname + '/dist', {
  extensions: 'html'
}));
app.use(errorHandler.httpError(404));
app.use(handler);
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
