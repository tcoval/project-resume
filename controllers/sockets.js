function parsePath(path) {
  return path.split('.')
}

function isNumeric(num) {
  return !isNaN(num);
}

module.exports = function(io, User, Resume, config) {

  io.on('connection', function(socket) {
    socket.on('username', function(data) {
      var username = data.username;

      User.findOne({username: username}, {'_id': 0, 'username': 1}, function (err, user) {
        if (err) console.error(err);

        if (!user) {
          io.emit('username available');
        } else {
          io.emit('username unavailable', user);
        }
      })
    });


    socket.on('value-change', function(data) {
      if (!data.authToken || data.authToken === config.defaultUserID) return;

      var authToken = data.authToken,
          path = parsePath(data.path),
          attr = path.pop(),
          val = data.val;

      Resume.findById(authToken, function(err, resume) {
        var base = resume;

        for (var i = 0, len = path.length; i < len; i++) {
          base = base[path[i]];
        }

        if (isNumeric(attr)) {
          base.set(parseInt(attr, 10), val);
        } else {
          base[attr] = val;
        }

        resume.save(function(err) {
          if (err) console.error(err);
        });
      });
    });
  });
};
