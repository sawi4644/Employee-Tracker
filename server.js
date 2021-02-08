const express= require('express');
const exphbs= require('express-handlebars')
const mysql= require('mysql');

const app= express();
const PORT= 3000

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//connect mysql

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'hahahaha',
  database : 'employee_trackerdb'
});
 
connection.connect(error => {
    if(error) throw error
    console.log(`MySQL connected on ${connection.threadId}`)
});
//routes
app.get('/', function(req,res){
    // connection.query('SELECT * FROM wishes',(err, results)=>{
    //     if (err)throw err
    
    //     res.render('index', { wishes: results});
    // })
})

app.post('/', (req,res)=>{
    // connection.query('INSERT INTO wishes(wish) VALUES (?)',req.body.wish ,)
    // console.log(req.body)
    // res.redirect('/')
})

app.delete('/:id', (req, response)=>{
    // const id = req.params.id
    // connection.query('DELETE FROM wishes WHERE id = ?;', [id], (error,res)=>{
    //     if (error) throw error

    //     response.redirect('/')
    })
// })
//listen
app.listen(PORT,()=> console.log(`Sever running on http://localhost:${PORT}`));