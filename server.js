const inquirer = require('inquirer')
const mysql = require('mysql');

//connect mysql

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hahahaha',
    database: 'employee_trackerdb'
});

connection.connect(error => {
    if (error) throw error
    console.log(`MySQL connected on ${connection.threadId}`)
});
const str = 'View all employees, View all departments, View all roles , Add new employee, Add new department, Add new role, Update employees role, Remove Employee, Remove Role, Remove Department, Exit';

const wwyd = str.split(",")


const employeeTracker = () => {
    inquirer.prompt([
        {
            name: 'action',
            type: 'list',
            message: "What would you like to do?",
            choices: wwyd,
        }
    ]).then(answer => {
        console.log(answer)
        if (answer.action === wwyd[0]) {
            viewEmployees()
        } else if (answer.action === wwyd[1]) {
            viewDepartments()
        } else if (answer.action === wwyd[2]) {
            viewRoles()
        } else if (answer.action === wwyd[3]) {
            addEmployee()
        } else if (answer.action === wwyd[4]) {
            addDepartment()
        } else if (answer.action === wwyd[5]) {
            addRole()
        } else if (answer.action === wwyd[6]) {
            updateRole()
        } else if (answer.action === wwyd[7]) {
            removeEmployee()
        } else if (answer.action === wwyd[8]) {
            removeDepartment()
        } else if (answer.action === wwyd[9]) {
            removeRole()
        } else {
            exit()
        }
    })
}
//view all employees
const viewEmployees = () => {
    console.log('Viewing all employees...')
    var query = connection.query("SELECT first_name, last_name, role_id,manager_id FROM employee",
        {

        }, function (err, res) {
            if (err) throw err;
            console.table(res)
            employeeTracker()
        }
    )
}
//view all departments
const viewDepartments = () => {
    console.log('Viewing all departments...')
    var query = connection.query("SELECT name FROM department",
        {

        }, function (err, res) {
            if (err) throw err;
            console.table(res)
            employeeTracker()
        }
    )
}
//view roles
const viewRoles = () => {
    console.log('Viewing all roles...')
    var query = connection.query("SELECT title, salary, department_id FROM role",
        {

        }, function (err, res) {
            if (err) throw err;
            console.table(res)
            employeeTracker()
        }
    )
}

// add emplyee
const addEmployee = () => {
    inquirer.prompt([
        {
            name: 'first',
            type: 'input',
            message: 'Employees First Name: '

        },
        {
            name: 'last',
            type: 'input',
            message: 'Employees Last Name:'
        },
        {
            name: 'id',
            type: 'input',
            message: 'Employees ID:'
        },
        {
            name: 'man_id',
            type: 'input',
            message: 'Manager ID:'
        }
    ]).then(answer => {
        console.log('Adding new employee...')
        connection.query(
            "INSERT INTO employee(first_name, last_name, role_id, manager_id)VALUES (?,?,?,?)",
            [
                answer.first,
                answer.last,
                answer.id,
                answer.man_id,
            ], function (err, res) {
                if (err) throw err;
                viewEmployees();
                employeeTracker()
            }
        )
    })
}
//add department
const addDepartment = () => {
    inquirer.prompt([
        {
            name: 'department',
            type: 'input',
            message: 'New Department Name:  '

        }
    ]).then(answer => {
        console.log('Adding new department...')
        connection.query(
            "INSERT INTO department(name)VALUES (?)",
            [
                answer.department,

            ], function (err, res) {
                if (err) throw err;
                viewDepartments();
                employeeTracker()
            }
        )
    })
}


//add role
const addRole = () => {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Title of New Role: '

        },
        {
            name: 'salary',
            type: 'input',
            message: 'Salary for this role:'
        },
        {
            name: 'depart_id',
            type: 'input',
            message: 'New Department ID:'
        }
    ]).then(answer => {
        console.log('Adding new role...')
        connection.query(
            "INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?);",
            [
                answer.title,
                answer.salary,
                answer.depart_id,
            ], function (err, res) {
                if (err) throw err;
                viewRoles();
                employeeTracker()
            }
        )
    })
}

//update employees role
const updateRole = () => {
    inquirer.prompt([
        {
            name: 'newRole',
            type: 'input',
            message: 'New Role Id: '

        },
        {
            name: 'person',
            type: 'input',
            message: 'Who is being promoted: '

        },
    ]).then(answer => {
        console.log('Updating Employee Role...')
        connection.query(
            "UPDATE employee SET role_id= ? WHERE first_name= ?",
            [
                answer.newRole,
                answer.person,
                
            ], function (err, res) {
                if (err) throw err;
                viewEmployees();
                employeeTracker()
            }
        )
    })
}


//remove employee
const removeEmployee = () => {
    inquirer.prompt([
        {
            name: 'delete',
            type: 'input',
            message: 'Last Name of employee to remove: '

        },
        
    ]).then(answer => {
        console.log('Removing Employee...')
            var query = connection.query("DELETE FROM employee WHERE last_name= ?;",
            [
                answer.delete,
                
            ], function (err, res) {
                if (err) throw err;
                viewEmployees();
                employeeTracker()
            }
        )
    })
}

       
//remove department
const removeDepartment = () => {
    inquirer.prompt([
        {
            name: 'removeDep',
            type: 'input',
            message: 'Name of department you want to remove: '

        },
        
    ]).then(answer => {
        console.log('Removing Department...')
            var query = connection.query("DELETE FROM department WHERE name= ?;",
            [
                answer.removeDep,
                
            ], function (err, res) {
                if (err) throw err;
                viewDepartment();
                employeeTracker()
            }
        )
    })
}
//remove role
const removeRole = () => {
    inquirer.prompt([
        {
            name: 'roleRem',
            type: 'input',
            message: 'Title of role you want to remove: '

        },
        
    ]).then(answer => {
        console.log('Removing Role...')
            var query = connection.query("DELETE FROM role WHERE title= ?;",
            [
                answer.roleRem,
                
            ], function (err, res) {
                if (err) throw err;
                viewRoles();
                employeeTracker()
            }
        )
    })
}

const exit = () => {
    console.log("Thanks! Have a nice day!")
    connection.end()
    process.exit()

}

employeeTracker();