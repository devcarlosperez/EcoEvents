const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [
      {
        name: 'Admin',
        surname: 'User',
        email: 'admin@ecoevents.com',
        password: 'password123',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Carlos',
        surname: 'Pérez',
        email: 'carlosadmin@ecoevents.com',
        password: 'admin1',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Iriome',
        surname: 'Matos',
        email: 'iriomeadmin@ecoevents.com',
        password: 'admin2',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kari',
        surname: 'Idskov',
        email: 'kariadmin@ecoevents.com',
        password: 'admin3',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tanja',
        surname: 'Savchuk',
        email: 'tanjaadmin@ecoevents.com',
        password: 'admin4',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    for (const user of users) {
      user.password = await bcrypt.hash(user.password, 8);
    }

    await queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
