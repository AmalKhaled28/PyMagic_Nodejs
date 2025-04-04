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
    answer_type: {
      type: DataTypes.ENUM('correct', 'wrong'),
      allowNull: false
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
    modelName: 'AnswerMotivation',
    tableName: 'answer_motivation',
    timestamps: true,
    underscored: true
  }
);

module.exports = AnswerMotivation;