'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Events', [
      {
        creator_id: 1,
        name: 'Limpiando la Playa Central',
        description: 'Unete a nosotros para limpiar la playa central de residuos plásticos.',
        event_type: 'cleaning',
        event_date: '2024-04-20',
        event_time: '09:00',
        location: 'Playa Central, Costa Verde',
        image_url: 'https://images.unsplash.com/photo-1618477461853-5f8dd1bc285c',
        max_participants: 50,
        status: 'approved',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        creator_id: 2,
        name: 'Plantación de Árboles en el Parque',
        description: 'Ayudanos a reforestar el parque de la ciudad con especies nativas.',
        event_type: 'planting',
        event_date: '2024-04-22',
        event_time: '10:00',
        location: 'Parque de la Ciudad',
        image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
        max_participants: 30,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        creator_id: 3,
        name: 'Taller de Reciclaje Creativo',
        description: 'Aprende a transformar tus residuos en objetos útiles y decorativos.',
        event_type: 'awareness',
        event_date: '2024-05-05',
        event_time: '16:00',
        location: 'Centro Comunitario',
        image_url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b',
        max_participants: 20,
        status: 'approved',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events', null, {});
  }
};
