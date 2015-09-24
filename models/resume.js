module.exports = function(mongoose) {

  var ResumeSchema = new mongoose.Schema({
    baseInfo: {
      name: String,
      address: {
        street: String,
        cityZip: String
      },
      phone: String,
      email: String
    },
    education: [
      {
        name: String,
        location: String,
        dateRange: String,
        degree: String,
        major: String,
        gpa: String
      }
    ],
    employment: [
      {
        name: String,
        location: String,
        dateRange: String,
        position: String,
        notes: [String]
      }
    ],
    skills: [String],
    projects: [
      {
        name: String,
        role: String,
        location: String,
        dateRange: String,
        notes: [String]
      }
    ],
    leadership: [
      {
        name: String,
        location: String,
        dateRange: String,
        role: String,
        notes: [String]
      }
    ],
    volunteering: [
      {
        name: String,
        location: String,
        dateRange: String,
        role: String,
        notes: [String]
      }
    ],
    honors: [
      {
        name: String,
        location: String,
        dateRange: String,
        role: String,
        notes: [String]
      }
    ],
    extraCurrActivities: [
      {
        name: String,
        location: String,
        dateRange: String,
        role: String,
        notes: [String]
      }
    ]
  });

  return mongoose.model('Resume', ResumeSchema);
}
