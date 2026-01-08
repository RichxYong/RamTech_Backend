

//Database Connection
const dotenv = require("dotenv").config();

const mysql = require('mysql2');
const Sequelize =require("sequelize");

const db= new Sequelize(
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    dialect: 'mysql',
    logging: false
  }
);

db.authenticate()
  .then(async ()=>{
    await db.async;
    console.log("Database connection is successful");
 })
   .catch((error) => {

    console.error("Database connection failed");
});

module.exports =db
;