const fs = require("fs");

const Employee = require('./lib/Employee');
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
let teamMembers = []

const userinfo = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Please enter Employee Name?', 
      validate: function (answer) {
        if (answer){

          return true;
          
        }else{
          return 'please put name'
        }

      }
    }, {
      type: 'input',
      name: 'email',
      message: 'Please enter Employee e-mail address?',
      validate: function (answer) {
        if (answer) {

          return true;

        } else {
          return 'Please put e-mail address'
        }

      }
    },
    {
     type: 'input',
     name: 'id',
     message: 'Please enter Employee Id?',
      validate: function (answer) {
        if (answer) {

          return true;

        } else {
          return 'Please put Employee Id'
        }

      }
    },
    {
      type: 'list',
      name: 'role',
      message: 'Select: Role',
      choices: ['Manager', 'Engineer', 'Intern']
    },
    
  ])
    .then(res => {
      console.log(res)
      //teamMembers.push(res)
      if (res.choices) {
        userinfo()
      } 
             //If role choice is manager
             else if (res.role ==='Manager'){
             inquirer.prompt([
              {
               type : 'input',
               name : 'office',
               message: 'Enter office number?',
                 validate: function (answer) {
                   if (answer) {

                     return true;

                   } else {
                     return 'Please put office number'
                   }

                 }

              }

             ])
             .then (resp =>{
              console.log(resp.office)
              const ManagerTeam = new Manager(res.name, res.email, res.id, res.role, resp.office)
               teamMembers.push(ManagerTeam);
               addOption()

             })
           }
      //If role choice is Engineer
           else if (res.role === 'Engineer') {
            inquirer.prompt([
             {
              type: 'input',
              name: 'gitHub',
              message: 'Enter Github name?',
                validate: function (answer) {
                  if (answer) {

                    return true;

                  } else {
                    return 'Please put Github name'
                  }

                }

             }

            ])
           .then(resp => {
            console.log(resp.gitHub)
             const EngineerTeam = new Engineer(res.name, res.email, res.id, res.role, resp.gitHub)
             teamMembers.push(EngineerTeam);
             addOption()

            })
          }

      //If role choice is Intern
      else if (res.role === 'Intern') {
        inquirer.prompt([
          {
            type: 'input',
            name: 'school',
            message: 'Enter School name?',
            validate: function (answer) {
              if (answer) {

                return true;

              } else {
                return 'Please put School name'
              }

            }

          }

        ])
          .then(resp => {
            console.log(resp.school)
            const internTeam = new Intern(res.name, res.email, res.id, res.role, resp.school)
            teamMembers.push(internTeam);
            addOption()

          })
      }
            

         else {
         
        console.log(teamMembers)
        const employeeTeam = new Employee(res.name, res.email, res.id, res.role);
        teamMembers.push(employeeTeam);
       // fs.writeFileSync(path.join(__dirname, "team.html"), (res))


            }
            //function to add option for more employee
            function addOption() {
              inquirer.prompt([
               {
                type: 'confirm',
                name: 'addMore',
                message: 'Would you like to add another Employee?'
               }
            ])
            .then(resp => {
              if (resp.addMore === true) {
                userinfo(teamMembers);
               } else {
                console.log(teamMembers)
                if (!fs.existsSync(OUTPUT_DIR)){
                  fs.mkdirSync(OUTPUT_DIR)
                }
                fs.writeFileSync(outputPath, render(teamMembers), 'UTF8')
              }
          })
      }

   //////   

    })
    .catch(err => console.log(err))
}




userinfo()


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
