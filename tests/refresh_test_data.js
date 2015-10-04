var mongoose = require('mongoose'),
    ObjectID = mongoose.Types.ObjectId,
    User = require('../models/user')(mongoose),
    Resume = require('../models/resume')(mongoose),
    theOneResume = require('./data/resumes/default_resume')(ObjectID),
    config = require('../util/config');

mongoose.connect("mongodb://admin:mongoBoss@ds042888.mongolab.com:42888/production");

var users = [];//require('./data/users')(ObjectID);
var resumes = require('./data/resumes')(ObjectID);

/*User.remove({}, function(err, removedUsers) {
  console.log(removedUsers.result.n + " users removed");
});

Resume.remove({}, function(err, removedResumes) {
  console.log(removedResumes.result.n + " resumes removed");
});*/

/*User.collection.insert(users, function(err, savedUsers) {
  if(err) {
    console.error(err);
  } else {
    var userOutput = users.map(function(user) {
      return "User: " + user.username + " was added"
    });
    console.log(userOutput.join('/n'));
  }
});*/

Resume.findById("160445a3b997fb2d8c9d8e38", function(err, resume) {
  console.log(resume);
});

/*Resume.collection.insert(resumes, function(err, savedResumes) {
  if(err) {
    console.error(err);
  } else {
    var resumeOutput = resumes.map(function(resume) {
      return "Resume: " + resume.baseInfo.name + " was added"
    });
    console.log(resumeOutput.join('\n'));
  }
});*/