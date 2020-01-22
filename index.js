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

//generating a card
const generateCard = async (role, data) => {

  //getting employee card template
  let card = await readFile(path.join(__dirname, './assets/html', `${role}-card.html`), 'utf-8');

  //replacing placeholder data with real data
  for (let prop in data) {
    const reg = new RegExp(`{%${prop}%}`, 'gi');
    card = card.replace(reg, data[prop]);
  }

  return card;

  console.log(`Successfully generated cards`);

}

//generating HTML
const generateHTML = async () => {

  //getting main.html to append with cards
  let mainHTML = await readFile(path.join(__dirname, './assets/html', 'main.html'), 'utf-8');

  //storing cards as variable
  let cards = '';

  //get all team data in array for loop
  const teamArray = [...team.manager, ...team.engineer, ...team.intern];

  for (employee of teamArray){

    //get all employees data
    const { name, id, email } = employee;
    const role = employee.getRole().toLowerCase();
    let special = '';

    //getting each employee's special data
    switch (role) {
      case 'manager':
        special = employee.getNumber();
        break;
      case 'engineer':
        special = employee.getGithub();
        break;
      case 'intern':
        special = employee.getSchool();
    }

    //appending cards
    cards += await generateCard(role, { name, id, email, special });
  }

  //replace main.html with cards and return it
  return mainHTML.replace('{%CARD%}', cards);

  console.log(`Successfully generated HTML`);

}

//initiating the app
async function init(){

  //adding manager
  await addMember('manager', managerPrompt);

  //adding team members as long as user selects 'Y'
  while (team.hasMemberToAdd){
    await addMember('member', memberPrompt);
  }

  //creating html
  let html = await generateHTML();

  //saving html to output folder
  await writeFile(path.join(__dirname, 'output', 'team.html'), html, 'utf-8');

  //open html file
  await open(path.join(__dirname, 'output', 'team.html'));
}

//general error function
process.on('unhandledRejection', err => {
  console.log(`Oops! Something went wrong. Please close the app and try again`);
  console.log(`Detail : ${err.name} | ${err.message}`);
  process.exit(1);
});

init();
