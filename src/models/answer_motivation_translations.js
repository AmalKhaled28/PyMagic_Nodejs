const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const AnswerMotivation = require('./answer_motivation');

class AnswerMotivationTranslation extends Model {}

AnswerMotivationTranslation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    answer_motivation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: AnswerMotivation,
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    language: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
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
    modelName: 'AnswerMotivationTranslation',
    tableName: 'answer_motivation_translations',
    timestamps: true,
    underscored: true
  }
);

module.exports = AnswerMotivationTranslation;