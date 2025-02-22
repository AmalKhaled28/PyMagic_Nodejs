module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('rewards', [
      {
        id: 1,
        text: 'Spellbook Scholar',
        image: '/images/spellbook_scholar.svg',
        required_points: 50
      },
      {
        id: 2,
        text: 'Daily Dedication',
        image: '/images/daily_dedication.svg',
        required_points: 70
      },
      {
        id: 3,
        text: 'Treasure Hunter',
        image: '/images/treasure_hunter.svg',
        required_points: 100
      },
      {
        id: 4,
        text: 'Master of the Arcane',
        image: '/images/master_of_the_arcane.svg',
        required_points: 130
      },
      {
        id: 5,
        text: 'First Spell Cast',
        image: '/images/first_spell_cast.svg',
        required_points: 180
      },
      {
        id: 6,
        text: 'Arcane Explorer',
        image: '/images/arcane_explorer.svg',
        required_points: 250
      },
      {
        id: 7,
        text: 'Blue Crystal',
        image: '/images/blue_crystal.svg',
        required_points: 300
      },
      {
        id: 8,
        text: 'Crystal Guardian',
        image: '/images/crystal_guardian.svg',
        required_points: 400
      },
      {
        id: 9,
        text: 'Ultimate Sorcerer',
        image: '/images/ultimate_sorcerer.svg',
        required_points: 500
      },
      {
        id: 10,
        text: 'Potion Brewer',
        image: '/images/potion_brewer.svg',
        required_points: 800
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('rewards', null, {});
  }
};
