// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee');

class Engineer extends Employee{

  constructor(name, email, id, role, github){
    super(name, email, id, role)
    this.github=github

  }
  getGithub() {
    return this.github;
  }

}

//exporting 
module.exports = Engineer;

// const engineer = new Engineer('Rajeev Kumar', 'Raj@gmail.com', '55', 'Director', 'RajRaj')

// console.log(engineer)