'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [
      {
        user_id: 2,
        event_id: 1,
        comment: '¡Me apunto! Es una gran iniciativa.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        event_id: 1,
        comment: 'Llevaré bolsas extra por si acaso.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        event_id: 2,
        comment: 'Excelente propuesta Juan, cuenta con mi apoyo.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
