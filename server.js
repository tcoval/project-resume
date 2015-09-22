var express = require('express'),
    config = require('./config.json'),
    stylus = require('stylus'),
    nib = require('nib'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    serveStatic = require('serve-static'),
    favicon = require('serve-favicon'),
    io = require('socket.io'),
    app = express();

// Automated stylus compiling
function stylusCompile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

require('./routes')(app, config);


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('combined'));
app.use(stylus.middleware({
    src: __dirname + '/public/style',
    compile: stylusCompile
}));
app.use(serveStatic(__dirname + '/public', {'index': false}));

app.listen(8080);
console.log("Listening on port: 8080");