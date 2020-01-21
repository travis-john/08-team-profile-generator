//global requirements
const fs = require('fs'),
      util = require('util'),
      path = require('path'),
      open = require('open'),
      Employee = require('./assets/js/Employee'),
      Engineer = require('./assets/js/Engineer'),
      Intern = require('./assets/js/Intern'),
      Manager = require('./assets/js/Manager'),
      { managerPrompt, memberPrompt, checkAddMember, askAbout } = require(`./assets/js/Inquirer`),
      readFile = util.promisify(fs.readFile),
      writeFile = util.promisify(fs.writeFile);

//storing data for team members
const team = {
  manager: [],
  engineer: [],
  intern: [],
  hasMemberToAdd: false
};

//adding member to team
const addMember = async (type, memberPrompt) => {

  //get answers
  const answers = await askAbout(memberPrompt)

  let title = type === 'member' ? answers.title: 'manager';
  let employee;

  //creating employee object from corresponding class
  switch(title){
    case 'manager':
      employee = new Manager(answers.name, answers.id, answers.email, answers.phone)
    break;
    case 'engineer':
      employee = new Engineer(answers.name, answers.id, answers.email, answers.github)
    break;
    case 'intern':
      employee = new Intern(answers.name, answers.id, answers.email, answers.school)
  }

  //adding it to team object
  team[title].push(employee);
  console.log(`Successfully added`, employee);

  //asking if there are more members of team
  const answer = await askAbout(checkAddMember);
  team.hasMemberToAdd = answer.hasMemberToAdd;
}

//initiating the app
async function init(){

  await addMember('manager', managerPrompt);


  while (team.hasMemberToAdd){
    await addMember('member', memberPrompt);
  }
}

init();
