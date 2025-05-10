// require('dotenv').config()

// const config = {
//   username: process.env.DB_USER || 'test',
//   password: process.env.DB_PASSWORD || 'test',
//   database: process.env.DB_NAME || 'test',
//   host: process.env.DB_HOST || 'test',
//   dialect: 'mysql',
//   logging: false
// }

// module.exports = {
//   development: config,
//   test: config,
//   production: config
// }
require('dotenv').config();

const config = {
  username: process.env.DB_USER || 'test',
  password: process.env.DB_PASSWORD || 'test',
  database: process.env.DB_NAME || 'test',
  host: process.env.DB_HOST || 'test',
  port: process.env.DB_PORT || 27186,
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    ssl: process.env.DB_CA ? {
      ca: require('fs').readFileSync(process.env.DB_CA),
      rejectUnauthorized: true
    } : false
  }
};

module.exports = {
  development: config,
  test: config,
  production: config
};