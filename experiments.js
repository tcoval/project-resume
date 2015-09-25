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
            return cb(null, { id: user._id });
        });
    }));

  passport.serializeUser(function(user, cb) {
    // Reevaluate how to reference user.id
    cb(null, user.id);
  });

  // Same thing here
  passport.deserializeUser(function(id, cb) {
    User.findById(id, function (err, user) {
      if(err) return cb(err);
      cb(null, { id: user._id });
    });
  });
}