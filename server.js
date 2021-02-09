const express = require('express');
const exphbs = require('express-handlebars')
const mysql = require('mysql');

const app = express();
const PORT = 3000

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//connect mysql

var connection = mysql.createConnection({
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
//ARTIST SEARCH
// const artistSearch = () => {
//     inquirer.prompt([
//         {
//             name: 'artist',
//             type: 'input',
//             message: 'Artist name:'
//         }
//     ]).then(answer => {
//         console.log(answer)
//         console.log('Searching for artist...')
//         var query = connection.query(
//             "SELECT * FROM top5000 WHERE ?",
//             {
//                 artist: answer.artist,
//             }, function (err, res) {
//                 if (err) throw err;
//                 console.table(res)
//                 runSearch()
//             }
//         )
//     })
// }
//MULTI SEARCH
// const multiSearch = () => {
//     console.log('multiSearch')
//     var query = connection.query(
//         "SELECT artist, count(*) FROM top5000 GROUP BY artist HAVING COUNT(*) > 1 ORDER BY 2 DESC",
//         {

//         }, function (err, res) {
//             if (err) throw err;
//             console.table(res)
//             runSearch()
//         })
}
// const rangeSearch = () => {
//     inquirer.prompt([
//         {
//             name: 'range1',
//             type: 'input',
//             message: 'Beginning Number:'

//         },
//         {
//             name: 'range2',
//             type: 'input',
//             message: 'End Number:'
//         }
//     ]).then(answer => {
//         var query = connection.query(
//             "SELECT * FROM top5000 WHERE position BETWEEN ? AND ? ",
//             [
//                 answer.range1,
//                 answer.range2
//             ], function (err, res) {
//                 if (err) throw err;
//                 console.table(res)
//                 runSearch()
//             }
//         )
//     })
// }

//SONG SEARCH
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

const exit = () => {
    connection.end()
    process.exit()
}
app.listen(PORT, () => console.log(`Sever running on http://localhost:${PORT}`));