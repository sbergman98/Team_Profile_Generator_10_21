const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util")

const writeFileAsync = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,\

function generalPrompt() {

  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of the Employee?"
    },
    {
      type: "input",
      name: "email",
      message: "What is the Employee's Email?"
    },
    {
      type: "input",
      name: "id",
      message: "What is the Employee ID number?"
    },
    {
      type: "list",
      name: "role",
      message: "What type of Employee are they?",
      choices: [
        "Intern",
        "Engineer",
        "Manager",
      ]
    },

  ])
};

function rolePrompt(role) {
  if (role === "Intern") {
    return inquirer.prompt([
      {
        type: "input",
        name: "school",
        message: "What School does the intern go to?"
      },
    ])
  } else if (role === "Manager") {
    return inquirer.prompt([
      {
        type: "input",
        name: "officeNumber",
        message: "What is the office number?"
      },
    ])
  } else if (role === "Engineer")
    return inquirer.prompt([
      {
        type: "input",
        name: "gitHubName",
        message: "What is your GitHub Name?"
      },
    ])


};

function continuePrompt() {
  return inquirer.prompt([
    { 
      type: "list",
      name: "continue",
      message: "Do you want to add more Employees?",
      choices: [
              "Yes",
              "No",
            ]
    },
  ])
 
};


let answers;
let roleAnswer;
let employee;
let continuation;

async function init() {

  try {

    const employees = []
    let addMore = true
    while (addMore) {
      answers = await generalPrompt()
      roleAnswer = await rolePrompt(answers.role)
      Object.assign(answers, roleAnswer)
      switch(answers.role) {
        case "Intern":
          employee = new Intern(answers.name, answers.id, answers.email, answers.school)
          break;
        case "Manager":
          employee = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
          break;
        default:
          employee = new Engineer(answers.name, answers.id, answers.email, answers.gitHubName)
      }
      employees.push(employee)
      continuation = await continuePrompt()
      addMore = continuation.continue === "Yes"
    }
    


    const html = render(employees);
     
    await writeFileAsync("Output/team.html", html);

  } catch (err) {
    console.log(err);
  }

}



init();


// and to create objects for each team member (using the correct classes as blueprints!)


// const employee = new Employee();

// employee.employeeInfo();

// After the user has input all employees desired, call the `render` function (required

// above) and pass in an array containing all employee objects; the `render` function will

// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML

// returned from the `render` function. Now write it to a file named `team.html` in the

// `output` folder. You can use the variable `outputPath` above target this location.








// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
