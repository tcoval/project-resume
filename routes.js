function getTemplate(id, defaultTemplate) {
  if(id === 'default') 
    id = defaultTemplate;
  return 'template-' + id;
}

module.exports = function(app, mongoose, Resume, config) {
  app.get('/', function(req, res) {
    res.render('frame');
  });

  app.get('/template', function(req, res) {
    Resume.findOne().where('baseInfo.name').equals('Tanner S. Coval').exec(function(err, resume) {
      if(err) {
        res.status(404).render('error');
        return
      }

      var template = getTemplate(req.query.templateID, config.defaultTemplate);
      res.render(template, resume, function(err, html) {
        if(err) {
          res.status(404).render('error');
        } else {
          res.send(html);
        }
      });
    });
  });
};
