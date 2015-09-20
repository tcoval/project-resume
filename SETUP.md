# Setup
### Linux

Install Node.js by running the following commands:

  `curl --silent --location https://deb.nodesource.com/setup_0.12 | sudo bash -`
 
  `sudo apt-get install --yes nodejs`

Install all node modules

  `npm install`

Install mongodb

  `sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10`
  
  `echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list`
  
  `sudo apt-get update`
  
  `sudo apt-get install -y mongodb-org`
  
All done!
