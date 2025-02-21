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
    lessonId: {
      type: DataTypes.STRING,
      field: 'lesson_id'
    },
    question: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.ENUM('multiple_choice', 'true_false')
    },
    options: {
      type: DataTypes.JSON
    },
    correctAnswer: {
      type: DataTypes.STRING,
      field: 'correct_answer'
    },
    hint: {
      type: DataTypes.STRING
    },
    level: {
      type: DataTypes.ENUM('easy', 'medium', 'hard')
    },
    points: {
      type: DataTypes.INTEGER
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
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
