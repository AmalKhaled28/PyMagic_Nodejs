const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Lesson extends Model {}

Lesson.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    unitId: {
      type: DataTypes.STRING,
      field: 'unit_id'
    },
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    flashCard: {
      type: DataTypes.STRING,
      field: 'flash_card'
    },
    videoUrl: {
      type: DataTypes.STRING,
      field: 'video_url'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
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
