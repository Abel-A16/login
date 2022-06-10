const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const encoder = bodyParser.urlencoded();
const app = express()
app.use(express.static("css"))

const connection = mysql.createConnection({
  host:"localhost",
  user:"zerubabel",
  password:"1234",
  database:"login"
})

connection.connect(function(error){
  if(error){ throw error }
  else {console.log("conneced to database")};
})

app.get("/", (req,res) => {
  res.sendFile(__dirname + "/index.html");
})
app.post("/", encoder, (req,res) => {
  var username = req.body.username
  var userpass = req.body.userpass
  connection.query("select * from loginuser where user_name = ? and user_pass = ?",[username,userpass],(err, result, fields) => {
    if (result.length > 0) {
      res.redirect("/welcome")
    } else {
      res.redirect("/");
    }
    res.end()
  })
})
app.get("/welcome", (req, res) => {
  res.sendFile(__dirname + "/welcome.html");
})
app.listen(5000)
