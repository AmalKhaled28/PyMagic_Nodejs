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
    type: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
    requiredPoints: {
      type: DataTypes.INTEGER,
      field: 'required_points'
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
