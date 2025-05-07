'use strict';
const { Asset } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Asset.bulkCreate([
      { type: 'brow', name: 'brow 1', image_url: '/assets/brows/brows_1.svg', price: 0 },
      { type: 'brow', name: 'brow 2', image_url: '/assets/brows/brows_2.svg', price: 50 },
      { type: 'brow', name: 'brow 3', image_url: '/assets/brows/brows_3.svg', price: 50 },
      { type: 'brow', name: 'brow 4', image_url: '/assets/brows/brows_4.svg', price: 50 },
      { type: 'brow', name: 'brow 5', image_url: '/assets/brows/brows_5.svg', price: 50 },
      { type: 'brow', name: 'brow 6', image_url: '/assets/brows/brows_6.svg', price: 50 },
      { type: 'brow', name: 'brow 7', image_url: '/assets/brows/brows_7.svg', price: 50 },
      { type: 'brow', name: 'brow 8', image_url: '/assets/brows/brows_8.svg', price: 50 },
      { type: 'brow', name: 'brow 9', image_url: '/assets/brows/brows_9.svg', price: 50 },
      { type: 'brow', name: 'brow 10', image_url: '/assets/brows/brows_10.svg', price: 50 },
      { type: 'brow', name: 'brow 11', image_url: '/assets/brows/brows_11.svg', price: 50 },
      { type: 'brow', name: 'brow 12', image_url: '/assets/brows/brows_12.svg', price: 50 },
      { type: 'brow', name: 'brow 13', image_url: '/assets/brows/brows_13.svg', price: 50 },
      { type: 'brow', name: 'brow 14', image_url: '/assets/brows/brows_14.svg', price: 50 },
      { type: 'brow', name: 'brow 15', image_url: '/assets/brows/brows_15.svg', price: 50 },
      { type: 'brow', name: 'brow 16', image_url: '/assets/brows/brows_16.svg', price: 50 },
      { type: 'brow', name: 'brow 17', image_url: '/assets/brows/brows_17.svg', price: 50 },
      { type: 'brow', name: 'brow 18', image_url: '/assets/brows/brows_18.svg', price: 50 },

      { type: 'eye', name: 'Eyes 1', image_url: '/assets/eyes/eyes_1.svg', price: 0 },
      { type: 'eye', name: 'Eyes 2', image_url: '/assets/eyes/eyes_2.svg', price: 80 },
      { type: 'eye', name: 'Eyes 3', image_url: '/assets/eyes/eyes_3.svg', price: 80 },
      { type: 'eye', name: 'Eyes 4', image_url: '/assets/eyes/eyes_4.svg', price: 80 },
      { type: 'eye', name: 'Eyes 5', image_url: '/assets/eyes/eyes_5.svg', price: 80 },
      { type: 'eye', name: 'Eyes 6', image_url: '/assets/eyes/eyes_6.svg', price: 80 },
      { type: 'eye', name: 'Eyes 7', image_url: '/assets/eyes/eyes_7.svg', price: 80 },
      { type: 'eye', name: 'Eyes 8', image_url: '/assets/eyes/eyes_8.svg', price: 80 },
      { type: 'eye', name: 'Eyes 9', image_url: '/assets/eyes/eyes_9.svg', price: 80 },
      { type: 'eye', name: 'Eyes 10', image_url: '/assets/eyes/eyes_10.svg', price: 80 },
      { type: 'eye', name: 'Eyes 11', image_url: '/assets/eyes/eyes_11.svg', price: 80 },
      { type: 'eye', name: 'Eyes 12', image_url: '/assets/eyes/eyes_12.svg', price: 80 },
      { type: 'eye', name: 'Eyes 13', image_url: '/assets/eyes/eyes_13.svg', price: 80 },
      { type: 'eye', name: 'Eyes 14', image_url: '/assets/eyes/eyes_14.svg', price: 80 },
      { type: 'eye', name: 'Eyes 15', image_url: '/assets/eyes/eyes_15.svg', price: 80 },
      { type: 'eye', name: 'Eyes 16', image_url: '/assets/eyes/eyes_16.svg', price: 80 },
      { type: 'eye', name: 'Eyes 17', image_url: '/assets/eyes/eyes_17.svg', price: 80 },

      { type: 'hairstyle', name: 'Hairstyle 1', image_url: '/assets/hairstyles/hairstyles_1.svg', price: 0 },
      { type: 'hairstyle', name: 'Hairstyle 2', image_url: '/assets/hairstyles/hairstyles_2.svg', price: 150 },
      { type: 'hairstyle', name: 'Hairstyle 3', image_url: '/assets/hairstyles/hairstyles_3.svg', price: 150 },
      { type: 'hairstyle', name: 'Hairstyle 4', image_url: '/assets/hairstyles/hairstyles_4.svg', price: 150 },
      { type: 'hairstyle', name: 'Hairstyle 5', image_url: '/assets/hairstyles/hairstyles_5.svg', price: 150 },
      { type: 'hairstyle', name: 'Hairstyle 6', image_url: '/assets/hairstyles/hairstyles_6.svg', price: 150 },
      { type: 'hairstyle', name: 'Hairstyle 7', image_url: '/assets/hairstyles/hairstyles_7.svg', price: 150 },
      { type: 'hairstyle', name: 'Hairstyle 8', image_url: '/assets/hairstyles/hairstyles_8.svg', price: 150 },
      { type: 'hairstyle', name: 'Hairstyle 9', image_url: '/assets/hairstyles/hairstyles_9.svg', price: 150 },
      { type: 'hairstyle', name: 'Hairstyle 10', image_url: '/assets/hairstyles/hairstyles_10.svg', price: 150 },
      { type: 'hairstyle', name: 'Hairstyle 11', image_url: '/assets/hairstyles/hairstyles_11.svg', price: 150 },
      { type: 'hairstyle', name: 'Hairstyle 12', image_url: '/assets/hairstyles/hairstyles_12.svg', price: 150 },
      { type: 'hairstyle', name: 'Hairstyle 13', image_url: '/assets/hairstyles/hairstyles_13.svg', price: 150 },
      { type: 'hairstyle', name: 'Hairstyle 14', image_url: '/assets/hairstyles/hairstyles_14.svg', price: 150 },
      { type: 'hairstyle', name: 'Hairstyle 15', image_url: '/assets/hairstyles/hairstyles_15.svg', price: 150 },
      { type: 'hairstyle', name: 'Hairstyle 16', image_url: '/assets/hairstyles/hairstyles_16.svg', price: 150 },

      { type: 'headdress', name: 'Headdress 1', image_url: '/assets/headdress/headdress_1.svg', price: 150 },
      { type: 'headdress', name: 'Headdress 2', image_url: '/assets/headdress/headdress_2.svg', price: 150 },
      { type: 'headdress', name: 'Headdress 3', image_url: '/assets/headdress/headdress_3.svg', price: 150 },
      { type: 'headdress', name: 'Headdress 4', image_url: '/assets/headdress/headdress_4.svg', price: 150 },
      { type: 'headdress', name: 'Headdress 5', image_url: '/assets/headdress/headdress_5.svg', price: 150 },
      { type: 'headdress', name: 'Headdress 6', image_url: '/assets/headdress/headdress_6.svg', price: 150 },

      { type: 'lip', name: 'Lips 1', image_url: '/assets/lips/lips_1.svg', price: 0 },
      { type: 'lip', name: 'Lips 2', image_url: '/assets/lips/lips_2.svg', price: 60 },
      { type: 'lip', name: 'Lips 3', image_url: '/assets/lips/lips_3.svg', price: 60 },
      { type: 'lip', name: 'Lips 4', image_url: '/assets/lips/lips_4.svg', price: 60 },
      { type: 'lip', name: 'Lips 5', image_url: '/assets/lips/lips_5.svg', price: 60 },
      { type: 'lip', name: 'Lips 6', image_url: '/assets/lips/lips_6.svg', price: 60 },
      { type: 'lip', name: 'Lips 7', image_url: '/assets/lips/lips_7.svg', price: 60 },
      { type: 'lip', name: 'Lips 8', image_url: '/assets/lips/lips_8.svg', price: 60 },
      { type: 'lip', name: 'Lips 9', image_url: '/assets/lips/lips_9.svg', price: 60 },
      { type: 'lip', name: 'Lips 10', image_url: '/assets/lips/lips_10.svg', price: 60 },
      { type: 'lip', name: 'Lips 11', image_url: '/assets/lips/lips_11.svg', price: 60 },
      { type: 'lip', name: 'Lips 12', image_url: '/assets/lips/lips_12.svg', price: 60 },
      { type: 'lip', name: 'Lips 13', image_url: '/assets/lips/lips_13.svg', price: 60 },
      { type: 'lip', name: 'Lips 14', image_url: '/assets/lips/lips_14.svg', price: 60 },
      { type: 'lip', name: 'Lips 15', image_url: '/assets/lips/lips_15.svg', price: 60 },
      { type: 'lip', name: 'Lips 16', image_url: '/assets/lips/lips_16.svg', price: 60 },
      { type: 'lip', name: 'Lips 17', image_url: '/assets/lips/lips_17.svg', price: 60 },
      { type: 'lip', name: 'Lips 18', image_url: '/assets/lips/lips_18.svg', price: 60 },
      { type: 'lip', name: 'Lips 19', image_url: '/assets/lips/lips_19.svg', price: 60 }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await Asset.destroy({
      where: {
        name: [
          'brow 1', 'brow 2', 'brow 3', 'brow 4', 'brow 5', 'brow 6', 'brow 7', 'brow 8', 'brow 9', 'brow 10',
          'brow 11', 'brow 12', 'brow 13', 'brow 14', 'brow 15', 'brow 16', 'brow 17', 'brow 18',
          'Eyes 1', 'Eyes 2', 'Eyes 3', 'Eyes 4', 'Eyes 5', 'Eyes 6', 'Eyes 7', 'Eyes 8', 'Eyes 9', 'Eyes 10',
          'Eyes 11', 'Eyes 12', 'Eyes 13', 'Eyes 14', 'Eyes 15', 'Eyes 16', 'Eyes 17',
          'Hairstyle 1', 'Hairstyle 2', 'Hairstyle 3', 'Hairstyle 4', 'Hairstyle 5', 'Hairstyle 6', 'Hairstyle 7',
          'Hairstyle 8', 'Hairstyle 9', 'Hairstyle 10', 'Hairstyle 11', 'Hairstyle 12', 'Hairstyle 13',
          'Hairstyle 14', 'Hairstyle 15', 'Hairstyle 16',
          'Headdress 1', 'Headdress 2', 'Headdress 3', 'Headdress 4', 'Headdress 5', 'Headdress 6',
          'Lips 1', 'Lips 2', 'Lips 3', 'Lips 4', 'Lips 5', 'Lips 6', 'Lips 7', 'Lips 8', 'Lips 9', 'Lips 10',
          'Lips 11', 'Lips 12', 'Lips 13', 'Lips 14', 'Lips 15', 'Lips 16', 'Lips 17', 'Lips 18', 'Lips 19'
        ]
      }
    });
  }
};