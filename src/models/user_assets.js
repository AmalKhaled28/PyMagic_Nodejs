const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class UserAsset extends Model {}

UserAsset.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  },
  {
    sequelize,
    modelName: 'UserAsset',
    tableName: 'user_assets',
    timestamps: false
  }
);

module.exports = UserAsset;