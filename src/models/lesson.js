const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Lesson extends Model {}

Lesson.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    unit_id: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    flash_card: {
      type: DataTypes.TEXT,
    },
    video_url: {
      type: DataTypes.TEXT,
    },
    language: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'Lesson',
    tableName: 'lessons',
    timestamps: false
  }
);

module.exports = Lesson;
