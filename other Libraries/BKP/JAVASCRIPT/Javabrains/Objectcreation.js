/* function employeeLoginCreation(name, age, Dept, Exp, login, logout) {

	var newobj = {};
	newobj.name = name;
	newobj.age = age;
	newobj.Dept=Dept;
	newobj.Exp=Exp;
	newobj.login=login;
	newobj.logout=logout;
  
  return this;

}

var emp1=employeeLoginCreation('rk',24,'AEG',1,10,10);

console.log(emp1)
 */

//optimised:

function employeeLoginCreation(name, age, Dept, Exp, login, logout) {

	//var this = {};
	this.name = name;
	this.age = age;
	this.Dept=Dept;
	this.Exp=Exp;
	this.login=login;
	this.logout=logout;
  
 // return this;

}

//var emp1=employeeLoginCreation('rk',24,'AEG',1,10,10);

console.log(emp1)
