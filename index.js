const mysql = require('mysql');
var alert = require('alert')
var Cryptr = require('cryptr');
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
	alert("user name or password incorrect")
    }
    res.end()
  })
})
app.post("/register", encoder, (req,res) => {
  var username = req.body.username
  var userpass = req.body.userpass
  var userpass2 = req.body.userpass2
if(userpass == userpass2){
 var sql = "INSERT INTO loginuser (user_name, user_pass) VALUES ?";
  var values = [
    [username, userpass],
  ];
  connection.query(sql, [values], function (err, result) {
    if (err) throw err;
   else { console.log("Number of records inserted: " + result.affectedRows);
       res.redirect("/success")}

  });
}else {
	res.redirect("/register")
}
});

app.get("/welcome", (req, res) => {
  res.sendFile(__dirname + "/welcome.html");
})

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/register.html");
})


app.get("/success", (req, res) => {
  res.sendFile(__dirname + "/success.html");
})


app.listen(5000)
