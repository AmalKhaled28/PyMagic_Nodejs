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
        required_points: 75
      },
      {
        id: 3,
        text: 'Treasure Hunter',
        image: '/images/treasure_hunter.svg',
        required_points: 150
      },
      {
        id: 4,
        text: 'Master of the Arcane',
        image: '/images/master_of_the_arcane.svg',
        required_points: 250
      },
      {
        id: 5,
        text: 'First Spell Cast',
        image: '/images/first_spell_cast.svg',
        required_points: 350
      },
      {
        id: 6,
        text: 'Arcane Explorer',
        image: '/images/arcane_explorer.svg',
        required_points: 450
      },
      {
        id: 7,
        text: 'Blue Crystal Seeker',
        image: '/images/blue_crystal.svg',
        required_points: 550
      },
      {
        id: 8,
        text: 'Crystal Guardian',
        image: '/images/crystal_guardian.svg',
        required_points: 650
      },
      {
        id: 9,
        text: 'Cursed Crystal Conqueror',
        image: '/images/cursed_crystals.svg',
        required_points: 750
      },
      {
        id: 10,
        text: 'Keeper of Secrets',
        image: '/images/book_of_secrets.svg',
        required_points: 850
      },
      {
        id: 11,
        text: 'Golden Key Holder',
        image: '/images/golden_key.svg',
        required_points: 950
      },
      {
        id: 12,
        text: 'Mystic Candle Keeper',
        image: '/images/mystic_candle.svg',
        required_points: 1050
      },
      {
        id: 13,
        text: 'Mystic Jar Master',
        image: '/images/mystic_jar.svg',
        required_points: 1150
      },
      {
        id: 14,
        text: 'Mystic Sage',
        image: '/images/mystic_sage.svg',
        required_points: 1250
      },
      {
        id: 15,
        text: 'Potion Brewer',
        image: '/images/potion_brewer.svg',
        required_points: 1350
      },
      {
        id: 16,
        text: 'Sorcerer’s Hat Wearer',
        image: '/images/sorcerers_hat.svg',
        required_points: 1450
      },
      {
        id: 17,
        text: 'Sorcerer’s Quill Scribe',
        image: '/images/sorcerers_quill.svg',
        required_points: 1550
      },
      {
        id: 18,
        text: 'Arcane Amulet Wielder',
        image: '/images/arcane_amulet.svg',
        required_points: 1650
      },
      {
        id: 19,
        text: 'Arcane Crystal Collector',
        image: '/images/arcane_crystal.svg',
        required_points: 1750
      },
      {
        id: 20,
        text: 'Starbound Scholar',
        image: '/images/starbound_books.svg',
        required_points: 1850
      },
      {
        id: 21,
        text: 'Ultimate Sorcerer',
        image: '/images/ultimate_sorcerer.svg',
        required_points: 1950
      },
      {
        id: 22,
        text: 'Wisdom Seeker',
        image: '/images/wisdom_feathers.svg',
        required_points: 2100
      },
      {
        id: 23,
        text: 'Wizard’s Crown Bearer',
        image: '/images/wizards_crown.svg',
        required_points: 2300
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('rewards', null, {});
  }
};