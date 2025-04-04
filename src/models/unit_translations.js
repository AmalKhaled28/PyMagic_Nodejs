const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Unit = require('./unit');

class UnitTranslation extends Model {}

UnitTranslation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    unit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Unit,
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    language: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
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
    modelName: 'UnitTranslation',
    tableName: 'unit_translations',
    timestamps: true, // Enable Sequelize to handle created_at and updated_at
    underscored: true // Use snake_case for column names
  }
);

module.exports = UnitTranslation;