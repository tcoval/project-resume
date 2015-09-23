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
    Resume.findOne({ _id: mongoose.Types.ObjectId(req.headers.authToken)}, function(err, resume) {
      if(err) {
        console.log(err);
        // TODO this needs to be changed (not sure what event causes this yet)
        res.status(404).render('error');
        return
      }

      var template = getTemplate(req.query.templateID, config.defaultTemplate);
      console.log(resume);
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
