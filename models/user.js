module.exports = function(mongoose) {
  var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    linkedin_id: String
  });
  userSchema.methods.validPassword = function(password) {
    return this.password === password;
  }

  return mongoose.model('User', userSchema);
}