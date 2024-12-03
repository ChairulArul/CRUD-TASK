// import package untuk connect ke database mysql
const mysql = require("mysql2");

// root awal untuk connect file database lokal dengan yang ada pada di mysql
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "belajar_express",
});

module.exports = db;
