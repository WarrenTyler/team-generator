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

// TODO: Write Code to gather information about the development team members, and render the HTML file.
startProgram();

async function startProgram() {
  const team = [
    new Manager("Bob", 1, "bob@bobit.com", 2),
    new Intern("Karen", 1, "karen@bobit.com", "Hard Knocks"),
    new Engineer("Erin", 1, "erin@bobit.com", "erinTheEngineer"),
  ];

  const htmlDoc = render(team);
  await fs.writeFile(outputPath, htmlDoc);
}



// const employeeInput = [
//   {
//     type: "input",
//     name: "name",
//     message: "Please enter your name",
//     validate(value) {
//       const pass = value.match(/^([a-z]+[,.]?[ ]?|[a-z]+['-]?)+$/);
//       if (pass) {
//         return true;
//       }

//       return "Please enter a valid name";
//     },
//   },
//   {
//     type: "input",
//     name: "id",
//     message: "Please enter your ID",
//     validate(value) {
//       const pass = value.match(/^[1-9][0-9]*$/);
//       if (pass) {
//         return true;
//       }

//       return "Please enter a valid office number";
//     },
//   },
//   {
//     type: "input",
//     name: "email",
//     message: "Please enter your email",
//     validate(value) {
//       const pass = value.match(
//         /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,4})$/
//       );
//       if (pass) {
//         return true;
//       }

//       return "Please enter a valid email";
//     },
//   },
// ];

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

function employee({role}) {
  return [
    // {prefix: "Hello "},
    // {
    //   type: "input",
    //   name: "role",
    //   message: "Role",
    // },
    {
      prefix: `Enter ${role}\n`,
      type: "input",
      name: "name",
      message: "Please enter your name",
      validate(value) {
        const pass = value.match(/^([a-z]+[,.]?[ ]?|[a-z]+['-]?)+$/);
        if (pass) {
          return true;
        }

        return "Please enter a valid name";
      },
    },
    {
      type: "input",
      name: "id",
      message: "Please enter your ID",
      validate(value) {
        const pass = value.match(/^[1-9][0-9]*$/);
        if (pass) {
          return true;
        }

        return "Please enter a valid office number";
      },
    },
    {
      type: "input",
      name: "email",
      message: "Please enter your email",
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
}
const ans = { role: "manager", hello: "hello"}
inquirer.prompt(employee(ans), {ans}).then((answers) => {
  console.log(JSON.stringify(answers, null, "  "));
});

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
// const questions = [
//   {
//     type: 'input',
//     name: 'tvShow',
//     message: "What's your favorite TV show?",
//   },
//   {
//     type: 'confirm',
//     name: 'askAgain',
//     message: 'Want to enter another TV show favorite (just hit enter for YES)?',
//     default: true,
//   },
// ];

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
