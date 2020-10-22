// TODO: Write code to define and export the Employee class

class Employee {
    constructor(name, id, email) {
        this.id = id;
        this.name = name;
        this.email = email;

    }
    employeeInfo() {
        console.log('The employee name is ${this.name}');
        console.log('The employee id is ${this.id}');
        console.log('The employee email is ${this.email}');
    }


}
module.exports = Employee;

