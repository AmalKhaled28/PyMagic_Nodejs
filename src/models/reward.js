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
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    required_points: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'Reward',
    tableName: 'rewards',
    timestamps: true, 
    underscored: true 
  }
);

module.exports = Reward;
