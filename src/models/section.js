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
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'Section',
    tableName: 'sections',
    timestamps: false
  }
);

module.exports = Section;
