const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class UserPreference extends Model {}

UserPreference.init(
  {
    face: DataTypes.STRING(255),
    brow: DataTypes.STRING(255),
    eye: DataTypes.STRING(255),
    hairstyle: DataTypes.STRING(255),
    lip: DataTypes.STRING(255),
    nose: DataTypes.STRING(255),
    headdress: DataTypes.STRING(255)
  },
  {
    sequelize,
    modelName: 'UserPreference',
    tableName: 'user_preferences',
    timestamps: false
  }
);

module.exports = UserPreference;