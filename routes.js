module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('frame');
    });

    app.get('/layout', function(req, res) {
        var layout;

        // TODO: grab valid layouts from global config file
        if (req.query.id === '1' || req.query.id === '2') {
          layout = 'layout-' + req.query.id;
          res.render(layout);
        } else {
          res.status(404);
          console.error(res.statusCode);
          res.render('404', { url: req.url });
          return;
        }
    });
};
