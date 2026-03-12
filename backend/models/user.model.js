module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user'
    }
  }, {
    tableName: 'Users',
    timestamps: true
  });

  User.associate = (models) => {
    User.hasMany(models.Event, { foreignKey: 'creator_id', as: 'createdEvents' });
    User.hasMany(models.Comment, { foreignKey: 'user_id', as: 'comments' });
    User.belongsToMany(models.Event, { 
      through: 'EventsParticipants',
      foreignKey: 'user_id',
      otherKey: 'event_id',
      as: 'participatingEvents' 
    });
  };

  return User;
};