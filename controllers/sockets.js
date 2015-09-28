function parsePath(path) {
  return path.split('.')
}

function isNumeric(num) {
  return !isNaN(num);
}

module.exports = function(io, Resume, config) {

  io.on('connection', function(socket) {

    socket.on('value-change', function(data) {
      if (!data.authToken) return;

      var authToken = data.authToken,
          path = parsePath(data.path),
          attr = path.pop(),
          val = data.val;

      Resume.findById(authToken, function(err, resume) {

        var base = resume;
        for(var i = 0; i < path.length; i++) base = base[path[i]];

        if (isNumeric(attr)) {
          base.set(parseInt(attr, 10), val);
        } else {
          base[attr] = val;
        }

        resume.save(function(err) {
          if(err) console.error(err);
        });
      });
    });
  });
};
