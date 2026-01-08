// Database Connection
const dotenv = require("dotenv").config();
const { Sequelize } = require("sequelize");

const db = new Sequelize(
  process.env.MYSQLDATABASE,  // Database name
  process.env.MYSQLUSER,      // Username
  process.env.MYSQLPASSWORD,  // Password
  {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT || 3306,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false  // For Railway/MySQL cloud SSL
      }
    },
    define: {
      freezeTableName: true,    // optional: prevents auto-pluralizing table names
    }
  }
);

// Test connection
const connectDB = async () => {
  try {
    await db.authenticate();
    console.log("✅ Database connection is successful");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
};

connectDB();

module.exports = db;
