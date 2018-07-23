var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var mysql = require("mysql");


var app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.search(methodOverride("_method"));

//Using Handlebars Method
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars');

var port = 3000;
app.listen(port);

var connection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "zombies23",
    database: "burgers_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id: " + connection.threadId);
})


app.get("/", (req, res) => {
    connection.query('SELECT * FROM burgers;', function (err, data) {
        res.render('index', {
            burgers: data
        });
    });
})

app.post("/create", (req, res) => {
    connection.query('INSERT INTO burgers (burger_name) VALUES (?);', [req.body.burger_name],
        function (err, result) {
            if (err) throw err;
            res.redirect('/');
        });
});

app.post("/update", (req, res) => {
    connection.query('UPDATE burgers SET burger_name = ? WHERE id = ?;', [req.body.burger_name, req.body.id],
        function (err, results) {
            if (err) throw err;
            res.redirect('/');
        });
});

app.post("/delete", (req, res)=>{
    connection.query("DELETE FROM burgers WHERE id = ?;",[req.body.id],function(err, results){
        if (err) throw err;
        res.redirect("/")
    })
})
// app.get('/:name', (req,res)=>{
//     for (var i=0;i<icecreams.length;i++){
//         if(icecreams[i].name === req.params.name)
//         return res.render('icecream',icecreams[i])
//     }
// })