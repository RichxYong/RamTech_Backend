

//Database Connection
const dotenv = require("dotenv").config();

const mysql = require('mysql2');
const Sequelize =require("sequelize");

const db =new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host:process.env.DB_HOST,
        dialect:"mysql",
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