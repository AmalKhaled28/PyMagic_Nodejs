const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Lesson = require('./lesson');

class LessonTranslation extends Model {}

LessonTranslation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    lesson_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Lesson,
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    language: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    flash_card: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    video_url: {
      type: DataTypes.TEXT,
      allowNull: true
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
    modelName: 'LessonTranslation',
    tableName: 'lesson_translations',
    timestamps: true, // Enable Sequelize to handle created_at and updated_at
    underscored: true // Use snake_case for column names
  }
);

module.exports = LessonTranslation;