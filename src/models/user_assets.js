const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class UserAsset extends Model {}

UserAsset.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    asset_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'assets',
        key: 'id'
      }
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