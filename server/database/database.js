const mysql = require("mysql");
const schamma = require("./schama");

// Database initalaze...
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

//Database connection establish...
con.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connection was successfull !");
  }
});

//Create Databale if not exists..!
con.query(`CREATE  DATABASE IF NOT EXISTS Tirandpro `, (err) => {
  if (err) {
    console.log(err);
    return;
  } else {
    //Start using Tirandpro database...
    con.query("USE Tirandpro", (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Tirandpro used now ");
        // Table create query
        schamma.TableCreates(con);
       
      }
    });
    console.log("database alrady exists !");
  }
});

module.exports = con;
