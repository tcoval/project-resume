var express = require('express'),
    config = require('./config.json'),
    stylus = require('stylus'),
    nib = require('nib'),
    passport = require('passport'),
    Strategy = require('passport-local').Strategy,
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
    captain = require('morgan'),
    serveStatic = require('serve-static'),
    favicon = require('serve-favicon'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    Resume = require('./models/resume')(mongoose);
    User = require('./models/user')(mongoose);
    //resumeFormat = require('./models/resumeFormat')(mongoose);

mongoose.connect(config.mongoURI);

app.use(captain('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSession({ secret: config.sessionSecret, resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

require('./passport')(mongoose, User, passport, Strategy);
require('./routes')(app, passport, mongoose, Resume, config);
require('./sockets')(io, Resume, config);

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

server.listen(8080);
console.log("Listening on port: 8080");
