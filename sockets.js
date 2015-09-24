function parsePath(path) {
  return path.split('.')
}

module.exports = function(io, Resume, config) {

  io.on('connection', function(socket) {

    socket.on('value-change', function(data) {
      var authToken = data.authToken,
          path = parsePath(data.path),
          attr = path.pop(),
          val = data.val;

      Resume.findById(authToken, function(err, resume) {

        var base = resume;
        for(var i = 0; i < path.length; i++) base = base[path[i]];
        base[attr] = val;

        resume.save(function(err) {
          if(err) console.error(err);
        });
      });
    });
  });
};
