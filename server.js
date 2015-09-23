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
    io = require('socket.io')(server),
    Resume = require('./models/resume')(mongoose);
    //resumeFormat = require('./models/resumeFormat')(mongoose);

mongoose.connect(config.mongoURI);

require('./routes')(app, mongoose, Resume, config);
require('./sockets')(io, config);

app.use(morgan('combined'));

// Automated stylus compiling
function stylusCompile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(stylus.middleware({
    src: __dirname + '/public/style',
    compile: stylusCompile
}));



app.use(serveStatic(__dirname + '/public', {'index': false}));

app.listen(8080);
console.log("Listening on port: 8080");