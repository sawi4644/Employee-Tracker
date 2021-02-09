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
const str = 'View all employees, View all departments, View all roles , Add new employee, Add new department, Add new role, Update employees role, Exit';

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
// const viewRoles = () => {
//     console.log('Viewing all roles...')
//     var query = connection.query("SELECT name FROM department",
//             {

//             }, function (err, res) {
//                 if (err) throw err;
//                 console.table(res)
//                 employeeTracker()
//             }
//         )
// }


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
        }
    ]).then(answer => {
        var query = connection.query(
            "INSERT INTO employee(first_name, last_name, role_id)VALUES (?,?,?)",
            [
                answer.first,
                answer.last,
                answer.id
            ], function (err, res) {
                if (err) throw err;
                viewEmployees()
                employeeTracker()
            }
        )
    })
}


// const songSearch = () => {
//     inquirer.prompt([
//         {
//             name: 'song',
//             type: 'input',
//             message: 'Song name:'
//         },
//     ]).then(answer => {
//         console.log(answer)
//         console.log('Searching for artist...')
//         var query = connection.query(
//             "SELECT * FROM top5000 WHERE ?",
//             {
//                 artist: answer.song,
//             }, function (err, res) {
//                 if (err) throw err;
//                 console.table(res)
//                 runSearch()
//             }
//         )
//     })
// }
//add employee
//add department
//add role
//update employees role

const exit = () => {
    console.log("Thanks! Have a nice day!")
    connection.end()
    process.exit()

}

employeeTracker();