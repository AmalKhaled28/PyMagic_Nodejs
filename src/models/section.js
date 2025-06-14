const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Section extends Model {}

Section.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
    modelName: 'Section',
    tableName: 'sections',
    timestamps: true, 
    underscored: true
  }
);

module.exports = Section;
