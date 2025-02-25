const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Unit extends Model {}

Unit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    unit_id: {
      type: DataTypes.STRING
    },
    section_id: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'Unit',
    tableName: 'units',
    timestamps: false
  }
);

module.exports = Unit;
