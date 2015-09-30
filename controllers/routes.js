function getTemplate(id, defaultTemplate) {
  if(id === 'default')
    id = defaultTemplate;
  return 'template-' + id;
}

module.exports = function(app, passport, mongoose, Resume, config) {
  app.get('/', function(req, res) {
    var user = {
      isLoggedIn: req.isAuthenticated(),
      authToken: req.session.passport && req.session.passport.user || config.defaultUserID
    };

    res.render('frame', user);
  });

  app.post('/user', function(req, res) {
    Resume.findById(req.body.authToken, function(err, user) {
      if (err) throw err;
      res.send(JSON.stringify(user));
    });
  })

  app.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', { successRedirect: '/', failureRedirect: '/', failureFlash: true})(req, res, next);
  });

  // app.post('/login', function(req, res, next) {
  //   // TODO may want to redirct with parameter for error rendering
  //   passport.authenticate('local-login', { successRedirect: '/', failureRedirect: '/', failureFlash: true})(req, res, next);
  // });

  app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function (err, user) {
      req.logIn(user, function () {
        res.status(err ? 500 : 200).send(err ? err : user);
      });
    })(req, res, next);
  });

  app.post('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/template', function(req, res) {
    var userId = req.user && req.user.id || config.defaultUserID;

    Resume.findById(userId, function(err, resume) {
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
