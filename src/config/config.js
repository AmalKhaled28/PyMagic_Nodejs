require('dotenv').config()

const config = {
  username: process.env.DB_USER || 'test',
  password: process.env.DB_PASS || 'test',
  database: process.env.DB_NAME || 'test',
  host: process.env.DB_HOST || 'test',
  dialect: 'mysql',
  logging: false
}

module.exports = {
  development: config,
  test: config,
  production: config
}
