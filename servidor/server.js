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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



//Buscar cartas

app.get('/getCartas/:id',(req,res)=>{

  let id_carta=req.params.id_carta;

  let sql="SELECT * FROM deck_carta WHERE id_carta='"+id_carta+"';"


  dbase.query(sql, (err,result)=>{
    if(err) throw err;
    res.send(result);
    });

});


app.get('/getCartasAttributes_by_User/:id', (req, res) => {
  let id = req.params.id;

  let sql = `
    SELECT dc.nome_carta, dc.attack_carta, dc.defend_carta
    FROM deck_user du
    JOIN deck_carta dc ON du.id_carta = dc.id_carta
    WHERE du.id_User = ?
  `;

  dbase.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      return res.status(500).send("Erro interno do servidor");
    }

    res.send(result);
  });
});


app.get('/getCartas_STATS/:id',(req,res)=>{

  let id_carta=req.params.id;

  let sql = "SELECT * FROM deck_carta WHERE id_carta='"+id_carta+"';"

      dbase.query(sql, (err,result)=>{
         if(err) throw err;

          res.send(result);

      });


  });