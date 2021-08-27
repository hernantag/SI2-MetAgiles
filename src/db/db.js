const mysql = require("mysql");
const { promisify } = require("util");

const { database } = require("./conexion");

const pool = mysql.createPool(database);

pool.getConnection((err, conexion) => {
  if (err) {
    console.log(err.code);
  }

  if (conexion) {
    conexion.release();
    console.log("Se conecto a la base de datos.");
  }

  return;
});

pool.query = promisify(pool.query);

module.exports = pool;
