const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Motivation extends Model {}

Motivation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    score_level: {
      type: DataTypes.STRING(50),
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
    modelName: 'Motivation',
    tableName: 'motivations',
    timestamps: true, 
    underscored: true 
  }
);

module.exports = Motivation;
