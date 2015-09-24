
var mongoose = require('mongoose'),
    Resume = require('./models/resume')(mongoose),
    config = require('./config');

mongoose.connect(config.mongoURI);

var tcoval = new Resume(
  {
    "_id": new mongoose.Types.ObjectId('56032fe92d82e7f12bd78b9f'),
    "baseInfo": {
      "name": "Tanner S. Coval",
      "address": {
        "street": "2107 NE 54th St.",
        "cityZip": "Seattle, WA 98105"
      },
      "phone": "(360) 608-9198",
      "email": "tannercoval@gmail.com"
    },
    "education": [
      {
        "name": "University of Washington",
        "location": "Seattle, WA",
        "dateRange": "Graduate 2016",
        "major": "Major - Computer Science",
        "gpa": "GPA - 3.71"
      },
      {
        "name": "King's Way Christian HS",
        "location": "Vancouver, WA",
        "dateRange": "Graduated 2012",
        "gpa": "GPA - 3.86"
      }
    ],
    "employment": [
      {
        "name": "WhitePages",
        "location": "Seattle, WA",
        "dateRange": "June 2014 - Present",
        "position": "Software Engineering Intern - Data Team",
        "notes": [
          "Designed and implemented a supervised machine learning model used for classification.",
          "Project provided groundwork for large improvements in company wide data accuracy.",
          "Theory used includes: logistic regression, decision trees, confusion matrix, lasso feature selection, and various sampling techniques."
        ]
      },
      {
        "name": "University of Washington",
        "location": "Seattle, WA",
        "dateRange": "Sept. 2013 - Dec. 2013",
        "position": "CSE Undergraduate Teaching Assistant",
        "notes": [
          "Lead quiz sections of 20+ students, attended lectuares, and graded assignments / tests."
        ]
      },
      {
        "name": "Porch",
        "location": "Seattle, WA",
        "dateRange": "June 2013 - Aug. 2013",
        "position": "Software Engineering Intern",
        "notes": [
          "Developed a multithreaded program to automate SEO related tasks specific to social media."
        ]
      },
      {
        "name": "Hewlett-Packard",
        "location": "Vancouver, WA",
        "dateRange": "June 2011 - Aug. 2011",
        "position": "Software Engineering Intern",
        "notes": [
          "Imaging and Printing Group (R&D)",
          "Created a tool for intern use, which connected with numerous printers on a network in order to analyze the printer's settings and internal files."
        ]
      }
    ],
    "skills": [
      {
        "skill": "Java",
        "experience": "(3 years)"
      },
      {
        "skill": "Machine Learning"
      },
      {
        "skill": "HTML, CSS, PHP, SQL",
        "experience": "(1 year)"
      },
      {
        "skill": "Python",
        "experience": "(2 years)"
      },
      {
        "skill": "Linux"
      },
      {
        "skill": "Ruby, R, Scala, Javascript",
        "experience": "(<1 year)"
      }
    ],
    "projects": [
      {
        "name": "HUSKY RESUME",
        "dateRange": "July 2013 - Nov. 2013",
        "notes": [
          "Designed a website a generate pdf resumes for students on campus"
        ]
      },
      {
        "name": "FIRST Robotics Team",
        "role": "Project Leader",
        "dateRange": "Jan. 2011 - Mar. 2011",
        "notes": [
          "Coordinated a 6 week build season for a robtics competition",
          "Robotics programmer, asssisted with mechanical development and design"
        ]
      }
    ],
    "leadership": [
      {
        "name": "Varsity Soccer and Football",
        "dateRange": "Sept. 2011",
        "role": "Team Captain (2 years)"
      },
      {
        "name": "Boy Scouts of America",
        "location": "Troop #358",
        "dateRange": "Feb. 2005 - Jan. 2012",
        "role": "Eagle Scout",
        "notes": [
          "Served as Senior Patrol Leader for multiple, six month rotations",
          "Member of the Order of the Arrow - Honor Society"
        ]
      }
    ]
  }
);

Resume.remove({}, function(err, resumes) {
  console.log(resumes.result.n + " entries removed");
});

var resumes = [tcoval];

for(var i = 0; i < resumes.length; i++) {
  var resume = resumes[i];
  resume.validate(function(err) {
    if(err) console.error(err);

    Resume.findById(mongoose.Types.ObjectId('56032fe92d82e7f12bd78b9f'), function(err, existingResume) {
      if(err) console.error(err);

      if(!existingResume) {
        resume.save(function(err, savedResume) {
          if(err) return console.error(err);
          console.log("saved entry: " + JSON.stringify({_id: savedResume._id, name: savedResume.baseInfo.name}));
        });
      }
    });
  });
}

console.log('\nFinished');

