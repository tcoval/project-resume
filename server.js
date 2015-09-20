var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var morgan = require('morgan');
var serveStatic = require('serve-static');
var favicon = require('serve-favicon');
var io = require('socket.io');
var app = express();
require('./routes')(app)

app.set('view options', { layout: false });
app.set('views', './views')
app.use(serveStatic('public', {'index': ['frame.html']}))

app.listen(8080);
console.log("Listening on port: 8080");