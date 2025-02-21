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
      type: DataTypes.STRING,
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
    correct_answer: {
      type: DataTypes.STRING,
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
