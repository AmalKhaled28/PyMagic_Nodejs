const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Unit extends Model {}

Unit.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    sectionId: {
      type: DataTypes.INTEGER,
      field: 'section_id'
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
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
