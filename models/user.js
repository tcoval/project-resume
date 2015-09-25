module.exports = function(mongoose) {
  var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    linkedin_id: String
  });

  return mongoose.model('User', userSchema);
}