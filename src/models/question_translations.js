const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Question = require('./question');

class QuestionTranslation extends Model {}

QuestionTranslation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Question,
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    language: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    question_text: { 
      type: DataTypes.TEXT,
      allowNull: false
    },
    options: {
      type: DataTypes.JSON,
      allowNull: true
    },
    correct_answer: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    hint: {
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
    modelName: 'QuestionTranslation',
    tableName: 'question_translations',
    timestamps: true, // Enable Sequelize to handle created_at and updated_at
    underscored: true // Use snake_case for column names
  }
);

module.exports = QuestionTranslation;