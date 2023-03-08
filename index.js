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

// holds all team members
const team = [];

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

const employeeRoles = {
  manager: {
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
    ],
  },
};


// createEmployee(employeeRoles.manager);
startProgram();

async function startProgram() {
  await createEmployee(employeeRoles.manager);

  // console.log("team");
  console.log(team);

  // const htmlDoc = render(team);
  // await fs.writeFile(outputPath, htmlDoc);
}

// const employees = createEmployee(employeeRoles.manager);
// console.log(employees.length);

async function createEmployee(role) {
  const questions = role.questions;
  questions.push(menu);

  console.log(`Please enter ${role.title}'s:`);
  await inquirer.prompt(questions).then(async (answers) => {
    const { menu, ...employeeProps } = answers;

    team.push(new role.class(...Object.values(employeeProps)));

    if (menu !== "finish") {
      await createEmployee(employeeRoles["manager"]);
    }
  });
}
