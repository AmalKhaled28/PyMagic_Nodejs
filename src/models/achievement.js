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
    user_id: {
      type: DataTypes.INTEGER,
    },
    reward_id: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
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
