module.exports = function(mongoose, User, Resume, passport, Strategy) {

  function getUserByUsername(username, cb) {
    User.findOne({username: username}, function(err, user) {
      cb(err, user);
    });
  }

  passport.use('local-signup', new Strategy(
    function(username, password, cb) {
      process.nextTick(function () {
        getUserByUsername(username, function(err, user) {
          if (err) return cb(err);
          if (user) {
            return cb(null, false, {message: 'That username is already taken.'});
          } else {
            var newUser = new User();
            var _id = mongoose.Types.ObjectId();
            var defaultResume = require('../tests/data/resumes/default_resume')(mongoose.Types.ObjectId);

            newUser._id = _id;
            newUser.username = username;
            newUser.password = password;

            defaultResume._id = _id;

            Resume.create(defaultResume, function (err, resume) {
              if (err) throw err;
            });

            newUser.save(function(err) {
              if (err) throw err;
              return cb(null, newUser);
            });
          }
        });
      });
    }));

  passport.use('local-login', new Strategy(
    function(username, password, cb) {
        getUserByUsername(username, function(err, user) {
            if(err) return cb(err);
            if(!user) return cb(null, false, {message: 'No user found.'});
            if(!user.validPassword(password)) return cb(null, false, {message: 'Oops! Wrong password.'});
            return cb(null, { id: user._id });
        });
    }));

  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    User.findById(id, function (err, user) {
      if(err) return cb(err);
      cb(null, { id: user._id });
    });
  });
}
