'use strict';

var express = require('express');
var compression = require('compression');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(compression());
app.use(express.static(__dirname + '/dist'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
