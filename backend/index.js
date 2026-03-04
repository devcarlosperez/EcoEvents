require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');

const app = express();
app.use(express.json());

const PORT = 8000;

require("./routes/user.routes")(app);
require("./routes/comment.routes")(app);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection successfully.');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
}

startServer();
