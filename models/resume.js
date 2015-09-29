module.exports = function(mongoose) {

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
    sections: [
      {
        title: String,
        layout: String,
        entries: [
          {
            title: String,
            subtitles: [String],
            location: String,
            dateRange: String,
            role: String,
            notes: [String]
          }
        ]
      }
    ]
  });

  return mongoose.model('Resume', ResumeSchema);
}
