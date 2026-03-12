require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/images', express.static('public/images'));

const PORT = process.env.PORT || 8000;

require("./routes/user.routes")(app);
require("./routes/event.routes")(app);
require("./routes/comment.routes")(app);
require("./routes/event-participant.routes")(app);

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
