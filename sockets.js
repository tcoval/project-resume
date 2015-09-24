module.exports = function(io, Resume, config) {

    io.on('connection', function(socket) {

      socket.on('value-change', function(data) {
        var section = data.section;
        var attr = data.attr;
        var val = data.val;

        // Resume.findById('5601ec288624b693c901ca6b', function (err, user) {
        //   if (err) throw err;
        //
        //   user.section.attr = val;
        //
        //   user.save(function (err) {
        //     if (err) throw err;
        //
        //     console.log('User successfully updated');
        //   })
        // });

        console.log(data);
      });

    });
};
