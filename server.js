var express = require('express'),
    config = require('./config.json'),
    stylus = require('stylus'),
    nib = require('nib'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    serveStatic = require('serve-static'),
    favicon = require('serve-favicon'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);

// Automated stylus compiling
function stylusCompile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

require('./routes')(app, config);
require('./sockets')(io, config);

app.use(morgan('combined'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(stylus.middleware({
    src: __dirname + '/public/style',
    compile: stylusCompile
}));

app.use(serveStatic(__dirname + '/public', {'index': false}));

server.listen(8080);
console.log("Listening on port: 8080");
