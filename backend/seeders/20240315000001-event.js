'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Events', [
      {
        creator_id: 1,
        name: 'Eco Fundraising Marathon',
        description: 'Join our Eco Marathon at Las Canteras Beach this March to raise funds for environmental projects across Gran Canaria. Runners of all levels are welcome to participate in this unique event that combines sport with environmental awareness. All proceeds will go towards local reforestation and conservation initiatives on the island.',
        event_type: 'other',
        event_date: '2026-03-12',
        event_time: '08:00',
        location: 'Las Canteras Beach',
        image_url: 'https://images.unsplash.com/photo-1719299246881-560dd0887174?q=80&w=1170&auto=format&fit=crop',
        max_participants: 100,
        status: 'approved',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        creator_id: 2,
        name: 'Tree Planting Day',
        description: 'Join us in Tafira Natural Park this March to plant native trees and help restore one of the island\'s most important green areas. Volunteers will receive guidance from local botanists on proper planting techniques and learn about the native species of Gran Canaria. Together, we can make a lasting impact on the island\'s natural landscape.',
        event_type: 'planting',
        event_date: '2026-03-28',
        event_time: '09:00',
        location: 'Tafira, Gran Canaria',
        image_url: 'https://plus.unsplash.com/premium_photo-1681140560806-928e8b9a9a20?q=80&w=1170&auto=format&fit=crop',
        max_participants: 50,
        status: 'approved',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        creator_id: 3,
        name: 'Botanical Garden Support',
        description: 'Spend a meaningful day at the Jardín Canario helping maintain one of the largest botanical gardens in Spain. Volunteers will assist with planting, weeding, and path restoration while learning about the unique flora of the Canary Islands. All experience levels are welcome to join this rewarding hands-on experience.',
        event_type: 'planting',
        event_date: '2026-04-25',
        event_time: '10:00',
        location: 'Jardín Canario',
        image_url: 'https://plus.unsplash.com/premium_photo-1663126858209-d0911b2efa08?q=80&w=1170&auto=format&fit=crop',
        max_participants: 40,
        status: 'approved',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        creator_id: 4,
        name: 'Eco Market',
        description: 'Support nature in Gran Canaria by joining our Eco Market at Las Canteras. We\'ll be selling sustainable products such as organic food, handmade crafts, and eco-friendly household items. Part of the proceeds will fund local environmental projects aimed at protecting the island\'s ecosystems.',
        event_type: 'awareness',
        event_date: '2026-04-20',
        event_time: '10:00',
        location: 'Las Canteras',
        image_url: 'https://images.unsplash.com/photo-1723142912077-b70ab43105f5?q=80&w=1288&auto=format&fit=crop',
        max_participants: 60,
        status: 'approved',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        creator_id: 5,
        name: 'Eco Summit',
        description: 'Join us at Auditorio Alfredo Kraus for a one-day Eco Summit dedicated to the future of sustainability on the island. The event will feature expert speakers, panel discussions, and workshops on renewable energy, waste reduction, and conservation strategies for the Canary Islands.',
        event_type: 'awareness',
        event_date: '2026-04-02',
        event_time: '09:30',
        location: 'Auditorio Alfredo Kraus',
        image_url: 'https://images.unsplash.com/photo-1515168985652-8454bcc8fcaf?q=80&w=1170&auto=format&fit=crop',
        max_participants: 200,
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
