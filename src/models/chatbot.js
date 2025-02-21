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
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id'
    },
    prompt: {
      type: DataTypes.STRING
    },
    answer: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
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
