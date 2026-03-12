'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('EventsParticipants', [
      {
        user_id: 2,
        event_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        event_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 4,
        event_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 5,
        event_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        event_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        event_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        event_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        event_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('EventsParticipants', null, {});
  }
};
