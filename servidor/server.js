const express = require('express')
var bodyParser = require('body-parser')

const mysql = require('mysql');
const fs = require('fs');

const app = express()
const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//parse application/json
app.use(bodyParser.json())


app.use(express.static('public'))

//CODE FOR CONNECTION TO DATABASE
const dbase = mysql.createConnection({
host:"localhost",
port:"3306",
user:"root",
password:"",
database:"jogos",
//this line is for MAMP only  --> socketPath:"/Applications/MAMP/tmp/mysql/mysql.sock"

});



dbase.connect(function(err){
if(err)throw err;

console.log("Database Connected!");

});

app.get('/getUser',(req,res)=>{
  let sql="SELECT * FROM user";

  dbase.query(sql, (err,result)=>{
    if(err) throw err;
    res.send(result);
    });
  
});

const bcrypt = require('bcrypt');
const saltRounds = 10;

app.post('/login',(req,res)=>{

  let nome = req.body.name;
  let password = req.body.password;
  let sql = "SELECT * FROM user WHERE nome = ?";

  dbase.query(sql, [nome], async (err, result) => {
      if (err) throw err;

      if (result.length > 0) {
          const hashedPassword = result[0].password;
          const isMatch = await bcrypt.compare(password, hashedPassword);

          if (isMatch) {
              res.send(result);
          } else {
              res.send({ "ack": 0 });
          }
      } else {
          res.send({ "ack": 0 });
      }
  });

});

  
app.post('/postUser',async (req, res) => {
    let nome = req.body.name;
    let password_user = req.body.password;

    let sql_verificar = "SELECT * from user WHERE nome ='"+nome+"';"

    
  dbase.query(sql_verificar, async (err,result)=>{
    if(err) throw err; 
  
      if(result.length>0){
      
        res.send({"ack":0})
      
      }    try {
        const hashedPassword = await bcrypt.hash(password_user, saltRounds);
        let sql = "INSERT INTO user (nome, password) VALUES (?, ?)";

        dbase.query(sql, [nome, hashedPassword], (err, result) => {
            if(err) throw err; 

            res.send({"ack":1});
        });
    } catch (err) {
        console.log(err);
    }
});

});
//buscar imagem de carta 
app.get('/getImagem_carta_costas', (req, res) => {
  dbase.query('SELECT img_carta FROM deck_carta_base WHERE id_carta = 1', (error, results) => {
      if (error) throw error;

      if (results.length > 0) {
          const imageData = results[0].img_carta;
          res.contentType('image/jpeg');
          res.end(imageData, 'binary');
      } else {
          res.status(404).send('Image not found');
      }
  });
});

//buscar imagem de carta 
app.get('/getImagem_carta_frente', (req, res) => {
  dbase.query('SELECT img_carta FROM deck_carta_base WHERE id_carta = 2', (error, results) => {
      if (error) throw error;

      if (results.length > 0) {
          const imageData = results[0].img_carta;
          res.contentType('image/jpeg');
          res.end(imageData, 'binary');
      } else {
          res.status(404).send('Image not found');
      }
  });
});












app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})