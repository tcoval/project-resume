function getTemplate(id, defaultTemplate) {
  if(id === 'default')
    id = defaultTemplate;
  return 'template-' + id;
}

module.exports = function(app, passport, mongoose, Resume, config) {
  app.get('/', function(req, res) {
    var user = {
      isLoggedIn: req.isAuthenticated(),
      authToken: req.session.passport && req.session.passport.user || config.defaultUserID,
      defaultUserID: config.defaultUserID
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
