const inquirer = require(`./inquirer`);

exports.managerPrompt = [
  {
    type: `input`,
    name: `name`,
    message: `Enter your manager's name`,
    validate: name => {
      if (name === undefined) return `Please enter a valid name`;

      let verifiedName = true;
      for (char of name.trim()) {
        if (!/[a-zA-Z ]/.test(char)) verifiedName =  `Invalid input. Please enter a valid name.`;
      }
      return verifiedName;
    },
    filter: fullName => {
      const fullName = name.trim();
      if(name) {
        let arr = name.split(` `);
        const newArr = arr.map(word => word.replace(word[0], word[0].toUpperCase()));

        return newArr.join(` `);
      }
    }
  },
  {
    type: `input`,
    name: `email`,
    message: `Please enter your manager's email address`,
    validate: email => {
      const verifiedEmail = email.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/);
      return verifiedEmail ? true : `Please enter a valid email.`;
    }
  },
  {
    type: `input`,
    name: `id`,
    message: `Please enter your manager's ID`
  },
  {
    type: `input`,
    name: `phone`,
    message: `Please enter your manager's office number`
  }
];
exports.memberPrompt = [
  {
    type: `list`,
    name: `title`,
    message: `Is the member to add an engineer or intern?`,
    choices: [`Engineer`, `Intern`],
    filter: function(val) {
      return val.toLowerCase();
    }
  },
  {
    type: `input`,
    name: `name`,
    message: `Please enter this team member's name.`,
    validate: name => {
      if (name === undefined) return `No input entered. Please enter a valid name.`;

      let verdit = true;
      for (char of name.trim()) {
        if (!/[a-zA-Z ]/.test(char)) verdit = `Invalid input. Please enter a valid name.`;
      }
      return verdit;
    },
    filter: fullName => {
      const name = fullName.trim();

      if (name) {
        let arr = name.split(` `);
        const newArr = arr.map(word => word.replace(word[0], word[0].toUpperCase()));

        return newArr.join(` `);
      }
    }
  },
  {
    type: `input`,
    name: `email`,
    message: `Please enter this team member's email.`,
    validate: email => {
      const verifiedEmail = email.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/);
      return verifiedEmail ? true : `Please enter a valid email.`;
    }
  },
  {
    type: `input`,
    name: `id`,
    message: `Please enter this team member's id.`
  },
  {
    type: `input`,
    name: `github`,
    message: `Please enter their GitHub username.`,
    validate: username => {
      const invalidUsername = username.match(
        /(?:[^a-zA-Z0-9-]|(?:-{2,})|(?:\B-)|(?:-\B)|(?:.{40,}))/
      );
      return invalidUsername ? `Please enter a valid GitHub username.` : true;
    },
    when: answers => {
      return answers.title === `engineer` ? true : false;
    }
  },
  {
    type: `input`,
    name: `school`,
    message: `Please enter the intern's school.`,
    when: answers => {
      return answers.title === `intern` ? true : false;
    },
    filter: school => {
      if (school) {
        let arr = school.trim().split(` `);
        const newArr = arr.map(word => word.replace(word[0], word[0].toUpperCase()));

        return newArr.join(` `);
      } else {
        return ``;
      }
    }
  }
];

exports.addMember = [
  {
    type: `confirm`,
    name: `addMember`,
    message: `Do you have more members to add?`
  }
];

exports.askAbout = async memberType => {
  return await inquirer.prompt(memberType);
};
