

const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(
  process.env.DB_NAME || 'test',
  process.env.DB_USER || 'test',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: false
  }
)

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err))

module.exports = sequelize

// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME || 'test',
//   process.env.DB_USER || 'test',
//   process.env.DB_PASSWORD || '',
//   {
//     host: process.env.DB_HOST || '127.0.0.1',
//     port: process.env.DB_PORT || 27186,
//     dialect: 'mysql',
//     logging: false,
//     dialectOptions: {
//       ssl: process.env.DB_CA ? {
//         ca: require('fs').readFileSync(process.env.DB_CA),
//         rejectUnauthorized: true
//       } : false
//     }
//   }
// );

// sequelize.authenticate()
//   .then(() => console.log('Database connected'))
//   .catch(err => console.error('Database connection error:', err));

// module.exports = sequelize;