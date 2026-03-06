module.exports = (sequelize, DataTypes) => {
  const EventParticipant = sequelize.define('EventParticipant', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Events',
        key: 'id'
      }
    }
  }, {
    tableName: 'EventsParticipants',
    timestamps: true
  });

  return EventParticipant;
};
