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
  addMember: false
};

const addMember = async (type, memberPrompt) => {

  //get answers
  const answers = await askAbout(memberPrompt)

  let title = type === 'member' ? answers.title: 'manager';
  let employee;

  //creating employee object from corresponding class
  switch(title){
    case 'manager':
      employee = new Employee(answers.name, answers.id, answers.email, answers.officePhone)
    break;
    case 'engineer':
      employee = new Employee(ansers.name, answers.id, answers.email, answers.github)
    break;
    case 'intern':
      employee = new Employee(answers.name, answers.id, answers.email, answers.school)
  }

  //adding it to team object
  team[title].push(employee);
  console.log(`Successfully added employee ${employee.answers.name}`);

  //asking if there are more members of team
  const answer = await askAbout(checkMemberToAdd);
  team.hasMemberToAdd = answer.hasMemberToAdd;
}

//initiating the app
async function init(){

  await addMember('manager', managerPrompt)

  while (team.hasMemberToAdd){
    addMember('member', memberPrompt)
  }
}

init();
