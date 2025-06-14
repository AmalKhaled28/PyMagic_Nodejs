const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Section = require('./section');

class SectionTranslation extends Model {}

SectionTranslation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    section_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Section,
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
    modelName: 'SectionTranslation',
    tableName: 'section_translations',
    timestamps: true, 
    underscored: true 
  }
);

module.exports = SectionTranslation;