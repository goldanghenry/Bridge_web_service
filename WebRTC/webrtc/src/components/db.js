const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "bridgedb",
});
db.connect();

module.exports = db;
