module.exports = function(io, config) {
    
    io.on('connection', function(socket) {

      socket.on('value-change', function(data) {
        var section = data.section;
        var attr = data.attr;
        var val = data.val;
      });

    });
};