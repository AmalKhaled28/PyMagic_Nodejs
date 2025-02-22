const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class StudentQuizQuestion extends Model {}

StudentQuizQuestion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    question_id: {
      type: DataTypes.INTEGER,
    },
    quiz_id: {
      type: DataTypes.INTEGER,
    },
    answer: {
      type: DataTypes.TEXT
    },
    is_correct: {
      type: DataTypes.BOOLEAN,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'StudentQuizQuestion',
    tableName: 'student_quiz_questions',
    timestamps: false
  }
);

module.exports = StudentQuizQuestion;
