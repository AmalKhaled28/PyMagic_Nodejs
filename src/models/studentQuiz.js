const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class StudentQuiz extends Model {}

StudentQuiz.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    lesson_id: {
      type: DataTypes.STRING,
    },
    unit_id: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    is_passed: {
      type: DataTypes.BOOLEAN,
    },
    score: {
      type: DataTypes.INTEGER
    },
    earned_points: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'StudentQuiz',
    tableName: 'student_quizzes',
    timestamps: false
  }
);

module.exports = StudentQuiz;
