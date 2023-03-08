const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs/promises");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { log } = require("console");
// const Employee = require("./lib/Employee");

// startProgram();

// async function startProgram() {
//   const team = [
//     new Manager("Bob", 1, "bob@bobit.com", 2),
//     new Intern("Karen", 1, "karen@bobit.com", "Hard Knocks"),
//     new Engineer("Erin", 1, "erin@bobit.com", "erinTheEngineer"),
//   ];

//   const htmlDoc = render(team);
//   await fs.writeFile(outputPath, htmlDoc);
// }

const employeeInput = [
  {
    type: "input",
    name: "name",
    message: "Name",
    validate(value) {
      const pass = value.match(/^([a-z]+[,.]?[ ]?|[a-z]+['-]?)+$/);
      if (pass) {
        return true;
      }

      return "Please enter a valid name";
    },
  },
  {
    type: "number",
    name: "id",
    message: "Employee ID",
    validate(value) {
      const pass = value > 0;
      if (pass) {
        return true;
      }

      return "Please enter a valid office number";
    },
  },
  {
    type: "input",
    name: "email",
    message: "Email",
    validate(value) {
      const pass = value.match(
        /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,4})$/
      );
      if (pass) {
        return true;
      }

      return "Please enter a valid email";
    },
  },
];

// const managerInput = [
//   ...employeeInput,
//   {
//     type: "input",
//     name: "office",
//     message: "Please enter your office number",
//     validate(value) {
//       const pass = value.match(/^[1-9][0-9]*$/);
//       if (pass) {
//         return true;
//       }

//       return "Please enter a valid office number";
//     },
//   },
// ];

const menu = {
  type: "list",
  name: "menu",
  message: "What do you want to do?",
  choices: [
    {
      name: "Add an engineer",
      value: "engineer",
    },
    {
      name: "Add an intern",
      value: "intern",
    },
    new inquirer.Separator(),
    {
      name: "Finish building the team",
      value: "finish",
    },
  ],
};

const managerRole = {
  title: "manager",
  class: Manager,
  questions: [
    ...employeeInput,
    {
      type: "number",
      name: "office",
      message: "Office number",
      validate(value) {
        const pass = value > 0;
        if (pass) {
          return true;
        }
        
        return "Please enter a valid office number";
      },
    },
    menu,
  ],
};


// inquirer.prompt(managerRole.questions).then((answers) => {
//   console.log(JSON.stringify(answers, null, "  "));
//   console.log(new managerRole.class("Foo", 1, "test@test.com", 100));
// });
console.log("Please enter team manager's:");

createEmployee(managerRole);

function createEmployee(role) {
  const questions = role.questions;
  inquirer.prompt(questions).then((answers) => {
    console.log(JSON.stringify(answers, null, "  "));
    console.log(new managerRole.class("Foo", 1, "test@test.com", 100));
  });
}

const output = [];

const questions = [
  {
    type: "input",
    name: "comments",
    message: "Any comments on your purchase experience?",
    default: "Nope, all good!",
  },
  {
    type: "list",
    name: "prize",
    message: "For leaving a comment, you get a freebie",
    choices: ["cake", "fries"],
    when(answers) {
      return answers.comments !== "Nope, all good!";
    },
  },
];

function ask(emp) {
  inquirer.prompt(emp).then((answers) => {
    output.push(answers);
    if (answers.askAgain) {
      ask(questions);
    } else {
      console.log("Your favorite TV Shows:", output.join(", "));
      console.log(answers);
    }
  });
}

// ask(questions);
