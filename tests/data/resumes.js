module.exports = function(ObjectID) {
  var resumes = [];
  
  resumes.push(require('./resumes/default_resume')(ObjectID));
  resumes.push(require('./resumes/demo_resume_1')(ObjectID));

  return resumes;
}