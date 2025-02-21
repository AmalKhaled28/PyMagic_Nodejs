const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Achievement extends Model {}

Achievement.init(
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
    rewardId: {
      type: DataTypes.INTEGER,
      field: 'reward_id'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'Achievement',
    tableName: 'achievements',
    timestamps: false
  }
);

module.exports = Achievement;
