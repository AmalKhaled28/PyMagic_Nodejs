const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Question extends Model {}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    lesson_id: {
      type: DataTypes.INTEGER,
    },
    question: {
      type: DataTypes.TEXT
    },
    type: {
      type: DataTypes.ENUM('multiple_choice', 'true_false')
    },
    options: {
      type: DataTypes.JSON
    },
    correct_answer: {
      type: DataTypes.TEXT
    },
    hint: {
      type: DataTypes.TEXT
    },
    level: {
      type: DataTypes.ENUM('easy', 'medium', 'hard')
    },
    points: {
      type: DataTypes.INTEGER
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'Question',
    tableName: 'questions',
    timestamps: false
  }
);

module.exports = Question;
