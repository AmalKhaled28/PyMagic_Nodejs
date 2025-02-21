const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Chatbot extends Model {}

Chatbot.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    prompt: {
      type: DataTypes.STRING
    },
    answer: {
      type: DataTypes.STRING
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'Chatbot',
    tableName: 'chatbot',
    timestamps: false
  }
);

module.exports = Chatbot;
