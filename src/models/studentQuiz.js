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
    lessonId: {
      type: DataTypes.STRING,
      field: 'lesson_id'
    },
    unitId: {
      type: DataTypes.STRING,
      field: 'unit_id'
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id'
    },
    isPassed: {
      type: DataTypes.BOOLEAN,
      field: 'is_passed'
    },
    score: {
      type: DataTypes.INTEGER
    },
    earnedPoints: {
      type: DataTypes.INTEGER,
      field: 'earned_points'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
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
