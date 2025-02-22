const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class AnswerMotivation extends Model {}

AnswerMotivation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: DataTypes.TEXT
    },
    answer_type: {
      type: DataTypes.ENUM('correct', 'wrong')
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'AnswerMotivation',
    tableName: 'answer_motivation',
    timestamps: false
  }
);

module.exports = AnswerMotivation;