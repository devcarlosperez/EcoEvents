module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    event_type: {
      type: DataTypes.ENUM('cleaning', 'planting', 'awareness', 'other'),
      allowNull: false
    },
    event_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    event_time: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING
    },
    max_participants: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      allowNull: false,
      defaultValue: 'pending'
    }
  }, {
    tableName: 'Events',
    timestamps: true
  });

  Event.associate = (models) => {
    Event.belongsTo(models.User, { foreignKey: 'creator_id', as: 'creator' });
    Event.hasMany(models.Comment, { foreignKey: 'event_id', as: 'comments' });
    Event.belongsToMany(models.User, { 
      through: 'EventsParticipants',
      foreignKey: 'event_id',
      otherKey: 'user_id',
      as: 'participants' 
    });
  };

  return Event;
};
