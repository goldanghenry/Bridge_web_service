const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "bridgedb",
});
db.connect();

module.exports = db;
