module.exports = function(app, config) {
    app.get('/', function(req, res) {
      console.log("hello:" + req.session); //.userID = 12345;
      res.render('frame');
    });

    app.get('/template', function(req, res) {
      var id = req.query.id;
      if(id === 'default') 
        id = config.defaultTemplate;
      var template = 'template-' + id;

      res.render(template, {}, function(err, html) {
        if(err) {
          res.status(404).render('error');
        } else {
          res.send(html);
        }
      });
    });
};
