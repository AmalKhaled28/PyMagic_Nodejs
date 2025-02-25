const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Reward extends Model {}

Reward.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
    required_points: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    modelName: 'Reward',
    tableName: 'rewards',
    timestamps: false
  }
);

module.exports = Reward;
