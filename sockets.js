function parsePath(path) {
  return path.split('.')
}

module.exports = function(io, Resume, config) {

  io.on('connection', function(socket) {

    socket.on('value-change', function(data) {
      console.log(data);
      var authToken = data.authToken,
          path = parsePath(data.path),
          attr = path.pop(),
          val = data.val;

      console.log(authToken);
      console.log(path.join());
      console.log(attr);
      console.log(val);
      Resume.findById(authToken, function(err, resume) {
        console.log(resume);

        var base;
        for(var i = 0, base = resume; i < path.length; i++, base = base[path[i]]);
        console.log(base);
        base[attr] = val;

        console.log(resume);

        resume.save(function(err) {
          if(err) console.error(err);
        });
      });
    });
  });
};
