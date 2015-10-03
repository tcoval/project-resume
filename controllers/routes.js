function getTemplate(id, defaultTemplate) {
  if(id === 'default')
    id = defaultTemplate;
  return 'template-' + id;
}

module.exports = function(app, mongoose, User, Resume, passport, config) {
  app.get('/', function(req, res) {
    /*var user = {
      isLoggedIn: req.isAuthenticated(),
      authToken: req.session.passport && req.session.passport.user || 'default'
    };
    */
    res.render('frame');//, user);
  });

  /*app.post('/resume', function(req, res) {
    var authToken = req.body.authToken === 'default' ? config.defaultUserID : req.body.authToken;

    Resume.findById(authToken, function(err, resume) {
      if (err) throw err;
      res.send(JSON.stringify(resume));
    });
  });

  app.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res.status(500).send({message: info.message});
      }
      req.logIn(user, function(err) {
        if (err) return next(err);
        return res.status(200).send(user);
      });
    })(req, res, next);
  });

  app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res.status(500).send({message: info.message});
      }
      req.logIn(user, function(err) {
        if (err) return next(err);
        return res.status(200).send(user);
      });
    })(req, res, next);
  });

  app.post('/logout', function(req, res) {
    req.logout();
    res.send()
  });

  app.get('/template', function(req, res) {
    var userId = req.user && req.user.id || config.defaultUserID;

    Resume.findById(userId, function(err, resume) {
      if(err) {
        res.status(404).render('error');
        return
      }
      var template = getTemplate(req.query.templateID, config.defaultTemplate);   //TODO this needs to be fixed / changed
      res.render(template, resume, function(err, html) {
        if(err) {
          console.error(err);
          res.status(404).render('error');
        } else {
          res.send(html);
        }
      });
    });

  });
  */
};
