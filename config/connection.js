var mysql = require("mysql");

function login() {
    return mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: "root",
        password: "zombies23",
        database: 'butgers_db',
        multipleStatements: true
    });
    console.log("Connection Works!")
}

module.exports = login;