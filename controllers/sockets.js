function parsePath(path) {
  return path.split('.')
}

function isNumeric(num) {
  return !isNaN(num);
}

module.exports = function(io, mongoose, User, Resume, config) {

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

    socket.on('add-section', function(data) {
      if (!data.authToken || data.authToken === config.defaultUserID) return;

      var authToken = data.authToken,
          newSection = data.newSection,
          sectionIndex = data.sectionIndex;

      Resume.findById(authToken, function(err, resume) {
        resume.sections.splice(sectionIndex, 0, newSection);

        resume.save(function(err) {
          if (err) console.error(err);
        });
      });
    });

    socket.on('remove-section', function(data) {
      if (!data.authToken || data.authToken === config.defaultUserID) return;

      var authToken = data.authToken,
          sectionIndex = data.sectionIndex;

      Resume.findById(authToken, function(err, resume) {
        resume.sections.splice(sectionIndex, 1);

        resume.save(function(err) {
          if (err) console.error(err);
        });
      });
    });

    socket.on('sortable-event', function(data) {
      if (!data.authToken || data.authToken === config.defaultUserID) return;

      var authToken = data.authToken,
          sections = data.sections;

      Resume.findById(authToken, function(err, resume) {
        resume.sections = sections;

        resume.save(function(err) {
          if (err) console.error(err);
        });
      });
    });
  });
};
