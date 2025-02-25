const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Motivation extends Model {}

Motivation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: DataTypes.TEXT
    },
    score_level: {
      type: DataTypes.STRING
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'Motivation',
    tableName: 'motivations',
    timestamps: false
  }
);

module.exports = Motivation;
