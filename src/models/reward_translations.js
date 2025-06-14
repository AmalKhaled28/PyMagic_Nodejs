const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Reward = require('./reward');

class RewardTranslation extends Model {}

RewardTranslation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    reward_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Reward,
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    language: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
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
    modelName: 'RewardTranslation',
    tableName: 'reward_translations',
    timestamps: true, 
    underscored: true 
  }
);

module.exports = RewardTranslation;