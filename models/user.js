module.exports = function (mongoose, bcrypt) {
  var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    linkedin_id: String
  });

  userSchema.methods.generateHash = function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  userSchema.methods.validPassword = function(password) {
      return bcrypt.compareSync(password, this.password);
  };

  return mongoose.model('User', userSchema);
}
