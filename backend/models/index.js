const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const user = require("./user.model")(sequelize, DataTypes);
const event = require("./event.model")(sequelize, DataTypes);
const comment = require("./comment.model")(sequelize, DataTypes);
const eventParticipant = require("./event-participant.model")(sequelize, DataTypes);

Object.values(sequelize.models).forEach(model => {
  if (model.associate) {
    model.associate(sequelize.models);
  }
});

module.exports = {
  sequelize,
  user,
  event,
  comment,
  eventParticipant
};
