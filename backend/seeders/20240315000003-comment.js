'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [
      {
        user_id: 2,
        event_id: 1,
        comment: 'Can\'t wait for the marathon! Running for a great cause.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        event_id: 1,
        comment: 'I\'ll bring some friends along, this is going to be amazing!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 4,
        event_id: 2,
        comment: 'Love that we\'re planting native trees. Great initiative!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        event_id: 3,
        comment: 'The Jardín Canario is beautiful, happy to help out there.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        event_id: 5,
        comment: 'Really looking forward to the sustainability workshops!',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
