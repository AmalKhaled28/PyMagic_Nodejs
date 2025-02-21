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
    questionId: {
      type: DataTypes.INTEGER,
      field: 'question_id'
    },
    quizId: {
      type: DataTypes.INTEGER,
      field: 'quiz_id'
    },
    answer: {
      type: DataTypes.STRING
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      field: 'is_correct'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
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
