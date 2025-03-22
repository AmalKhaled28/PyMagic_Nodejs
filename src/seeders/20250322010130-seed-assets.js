'use strict';
const { Asset } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Asset.bulkCreate([
      // Face assets
      { type: 'face', name: 'Boy Face 1', image_url: '/assets/faces/boy_face_1.svg', price: 50 },
      { type: 'face', name: 'Boy Face 2', image_url: '/assets/faces/boy_face_2.svg', price: 50 },
      { type: 'face', name: 'Boy Face 3', image_url: '/assets/faces/boy_face_3.svg', price: 50 },
      { type: 'face', name: 'Boy Face 4', image_url: '/assets/faces/boy_face_4.svg', price: 50 },
      { type: 'face', name: 'Boy Face 5', image_url: '/assets/faces/boy_face_5.svg', price: 50 },

      // Brow assets
      { type: 'brow', name: 'brow 1', image_url: '/assets/brows/brows_1.svg', price: 0 },
      { type: 'brow', name: 'brow 2', image_url: '/assets/brows/brows_2.svg', price: 10 },
      { type: 'brow', name: 'brow 3', image_url: '/assets/brows/brows_3.svg', price: 10 },
      { type: 'brow', name: 'brow 4', image_url: '/assets/brows/brows_4.svg', price: 10 },
      { type: 'brow', name: 'brow 5', image_url: '/assets/brows/brows_5.svg', price: 10 },
      { type: 'brow', name: 'brow 6', image_url: '/assets/brows/brows_6.svg', price: 10 },

      // Eye assets
      { type: 'eye', name: 'Eyes 1', image_url: '/assets/eyes/eyes_1.svg', price: 0 },
      { type: 'eye', name: 'Eyes 2', image_url: '/assets/eyes/eyes_2.svg', price: 15 },
      { type: 'eye', name: 'Eyes 3', image_url: '/assets/eyes/eyes_3.svg', price: 15 },
      { type: 'eye', name: 'Eyes 4', image_url: '/assets/eyes/eyes_4.svg', price: 15 },
      { type: 'eye', name: 'Eyes 5', image_url: '/assets/eyes/eyes_5.svg', price: 15 },

      // Hairstyle assets
      { type: 'hairstyle', name: 'Hairstyle 1', image_url: '/assets/hairstyles/hairstyles_1.svg', price: 0 },
      { type: 'hairstyle', name: 'Hairstyle 2', image_url: '/assets/hairstyles/hairstyles_2.svg', price: 20 },
      { type: 'hairstyle', name: 'Hairstyle 3', image_url: '/assets/hairstyles/hairstyles_3.svg', price: 20 },
      { type: 'hairstyle', name: 'Hairstyle 4', image_url: '/assets/hairstyles/hairstyles_4.svg', price: 20 },
      { type: 'hairstyle', name: 'Hairstyle 5', image_url: '/assets/hairstyles/hairstyles_5.svg', price: 20 },

      // Headdress assets
      { type: 'headdress', name: 'Headdress 1', image_url: '/assets/headdress/headdress_1.svg', price: 25 },
      { type: 'headdress', name: 'Headdress 2', image_url: '/assets/headdress/headdress_2.svg', price: 25 },
      { type: 'headdress', name: 'Headdress 3', image_url: '/assets/headdress/headdress_3.svg', price: 25 },
      { type: 'headdress', name: 'Headdress 4', image_url: '/assets/headdress/headdress_4.svg', price: 25 },

      // Lip assets
      { type: 'lip', name: 'Lips 1', image_url: '/assets/lips/lips_1.svg', price: 0 },
      { type: 'lip', name: 'Lips 2', image_url: '/assets/lips/lips_2.svg', price: 10 },
      { type: 'lip', name: 'Lips 3', image_url: '/assets/lips/lips_3.svg', price: 10 },
      { type: 'lip', name: 'Lips 4', image_url: '/assets/lips/lips_4.svg', price: 10 },
      { type: 'lip', name: 'Lips 5', image_url: '/assets/lips/lips_5.svg', price: 10 },
      { type: 'lip', name: 'Lips 6', image_url: '/assets/lips/lips_6.svg', price: 10 },
      { type: 'lip', name: 'Lips 7', image_url: '/assets/lips/lips_7.svg', price: 10 },

      // Nose assets
      { type: 'nose', name: 'Nose 1', image_url: '/assets/nose/nose_1.svg', price: 0 },
      { type: 'nose', name: 'Nose 2', image_url: '/assets/nose/nose_2.svg', price: 10 },
      { type: 'nose', name: 'Nose 3', image_url: '/assets/nose/nose_3.svg', price: 10 },
      { type: 'nose', name: 'Nose 4', image_url: '/assets/nose/nose_4.svg', price: 10 },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await Asset.destroy({
      where: {
        name: [
          'Boy Face 1', 'Boy Face 2', 'Boy Face 3', 'Boy Face 4', 'Boy Face 5',
          'brow 1', 'brow 2', 'brow 3', 'brow 4', 'brow 5', 'brow 6',
          'Eyes 1', 'Eyes 2', 'Eyes 3', 'Eyes 4', 'Eyes 5',
          'Hairstyle 1', 'Hairstyle 2', 'Hairstyle 3', 'Hairstyle 4', 'Hairstyle 5',
          'Headdress 1', 'Headdress 2', 'Headdress 3', 'Headdress 4',
          'Lips 1', 'Lips 2', 'Lips 3', 'Lips 4', 'Lips 5', 'Lips 6', 'Lips 7',
          'Nose 1', 'Nose 2', 'Nose 3', 'Nose 4'
        ]
      }
    });
  }
};