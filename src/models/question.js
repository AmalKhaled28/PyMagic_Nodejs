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
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'lessons', // Table name for the foreign key
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    type: {
      type: DataTypes.ENUM('multiple_choice', 'true_false'),
      allowNull: false
    },
    level: {
      type: DataTypes.ENUM('easy', 'medium', 'hard'),
      allowNull: false
    },
    points: {
      type: DataTypes.INTEGER,
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
    modelName: 'Question',
    tableName: 'questions',
    timestamps: true, // Enable Sequelize to handle created_at and updated_at
    underscored: true // Use snake_case for column names
  }
);

module.exports = Question;