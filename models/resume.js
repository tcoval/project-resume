module.exports = function(mongoose) {

  var entrySchema = new mongoose.Schema({
    title: String,
    subtitles: [String],
    location: String,
    dateRange: String,
    role: String,
    notes: [String]
  }, { _id: false });

  var sectionSchema = new mongoose.Schema({
    title: String,
    layout: String,
    entries: [entrySchema]
  }, { _id: false });

  var ResumeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    preferredLayout: Number,
    baseInfo: {
      name: String,
      address: {
        street: String,
        cityZip: String
      },
      phone: String,
      email: String,
      linkedin: String,
      website: String
    },
    sections: [sectionSchema]
  });

  return mongoose.model('Resume', ResumeSchema);
}
