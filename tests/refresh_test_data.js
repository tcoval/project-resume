var mongoose = require('mongoose'),
    ObjectID = mongoose.Types.ObjectId,
    User = require('../models/user')(mongoose),
    Resume = require('../models/resume')(mongoose),
    config = require('../util/config');

mongoose.connect(config.mongoURI);

var users = require('./data/users')(ObjectID);
var resumes = require('./data/resumes')(ObjectID);

User.remove({}, function(err, removedUsers) {
  console.log(removedUsers.result.n + " users removed");
});

Resume.remove({}, function(err, removedResumes) {
  console.log(removedResumes.result.n + " resumes removed");
});

User.collection.insert(users, function(err, savedUsers) {
  if(err) {
    console.error(err);
  } else {

    var userOutput = users.map(function(user) {
      return "User: " + user.username + " was added"
    });
    console.log(userOutput.join('/n'));
  }
});

Resume.collection.insert(resumes, function(err, savedResumes) {
  if(err) {
    console.error(err);
  } else {
    var resumeOutput = resumes.map(function(resume) {
      return "Resume: " + resume.baseInfo.name + " was added"
    });
    console.log(resumeOutput.join('\n'));
  }
});

console.log('\nFinished');
