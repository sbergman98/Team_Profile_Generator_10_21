// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.


const Employee = require("./Employee");

class Engineer extends Employee {
 constructor(gitHubName) {
     this.gitHubName =  gitHubName;
     
 }


 gitHubName() {
    console.log('The GitHub name is  ${this.gitHubName}');
 }

}