
var mongoose = require('mongoose'),
    User = require('./models/user')(mongoose),
    Resume = require('./models/resume')(mongoose),
    config = require('./config');

mongoose.connect(config.mongoURI);

User.remove({}, function(err, removedUsers) {
  console.log(removedUsers.result.n + " users removed");
});

Resume.remove({}, function(err, removedResumes) {
  console.log(removedResumes.result.n + " entries removed");
});

User.create(
  {
    "_id": new mongoose.Types.ObjectId("560445a3b997fb2d8c9d8e83"),
    "username": "tcoval",
    "password": "password123"
  },
  function (err, user) {
    if (err) {
      console.error(err);
    } else { 
      console.log(user._id);
    }
  }
);

Resume.create(
  {
    "_id": new mongoose.Types.ObjectId('160445a3b997fb2d8c9d8e38'),
    "baseInfo": {
      "name": "Default Resume",
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
      "Java (3 years)",
      "Machine Learning",
      "HTML, CSS, PHP, SQL (1 year)",
      "Python (2 years)",
      "Linux",
      "Ruby, R, Scala, Javascript (<1 year)"
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
  },
  function (err, resume) {
    if (err) {
      console.error(err);
    } else {
      console.log(resume._id);
    }
  }
);

Resume.create(
  {
    "_id": new mongoose.Types.ObjectId('560445a3b997fb2d8c9d8e83'),
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
      "Java (3 years)",
      "Machine Learning",
      "HTML, CSS, PHP, SQL (1 year)",
      "Python (2 years)",
      "Linux",
      "Ruby, R, Scala, Javascript (<1 year)"
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
  },
  function (err, resume) {
    if (err) {
      console.error(err);
    } else {
      console.log(resume._id);
    }
  }
);

console.log('\nFinished');
