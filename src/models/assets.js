const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Asset extends Model {}

Asset.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.ENUM('face', 'brow', 'eye', 'hairstyle', 'headdress', 'lip', 'nose'),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Asset',
    tableName: 'assets',
    timestamps: false
  }
);

module.exports = Asset;