const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

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
      references: {
        model: 'answer_motivation',
        key: 'id'
      },
      onDelete: 'CASCADE',
    },
    language: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'AnswerMotivationTranslation',
    tableName: 'answer_motivation_translations',
    timestamps: false, // We're manually handling created_at and updated_at
    underscored: true
  }
);

module.exports = AnswerMotivationTranslation;