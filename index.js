//global requirements
const fs = require('fs'),
      util = require('util'),
      path = require('path'),
      open = require('open'),
      const Employee = require('./assets/js/Employee'),
      const Engineer = require('./assets/js/Engineer'),
      const Intern = require('./assets/js/Intern'),
      const Manager = require('./assets/js/Manager'),
      const { managerPrompt, memberPrompt, addMember, askAbout } = require(`.assets/js/Inquirer`),
      readFile = util.promisifify(fs.readFile),
      writeFile = util.promisify(fs.writeFile);
