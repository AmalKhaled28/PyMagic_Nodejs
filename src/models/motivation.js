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
      type: DataTypes.STRING
    },
    scoreLevel: {
      type: DataTypes.STRING,
      field: 'score_level'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
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
