require('dotenv').config();
const sequelize = require('./config/db');

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
}

testConnection();