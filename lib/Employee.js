// TODO: Write code to define and export the Employee class
class Employee{
constructor(name, email, id, role){
this.name = name
this.email = email
this.id = id
this.role = role
}

getName() {
  return this.name;
}

getEmail() {

  return this.email;
}
getId() {
  return this.id;
}

getRole(){
  return this.role;
}

}

//exporting Employee class 
module.exports = Employee;

//const employee1 = new Employee ('Shweta', 'sinkyraj@gmail.com', 12, 'Employee')

//console.log(employee1)