const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Motivation = require('./motivation');

class MotivationTranslation extends Model {}

MotivationTranslation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    motivation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Motivation,
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
    modelName: 'MotivationTranslation',
    tableName: 'motivation_translations',
    timestamps: true, // Enable Sequelize to handle created_at and updated_at
    underscored: true // Use snake_case for column names
  }
);

module.exports = MotivationTranslation;