module.exports = function(mongoose, User, passport, Strategy) {

  function getUserByUsername(username, cb) {
    User.findOne({username: username}, function(err, user) {
      cb(err, user);
    });
  }

  passport.use(new Strategy(
    function(username, password, cb) {
        getUserByUsername(username, function(err, user) {
            if(err) return cb(err);
            if(!user) return cb(null, false);
            if(!user.validPassword(password)) return cb(null, false);
            console.log('got here');
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