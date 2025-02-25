const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Lesson extends Model {}

Lesson.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    lesson_id: {
      type: DataTypes.STRING
    },
    unit_id: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    flash_card: {
      type: DataTypes.TEXT
    },
    video_url: {
      type: DataTypes.STRING
    },
    language: {
      type: DataTypes.STRING
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
