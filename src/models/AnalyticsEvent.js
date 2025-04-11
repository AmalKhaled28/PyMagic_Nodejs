const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class AnalyticsEvent extends Model {}

AnalyticsEvent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // Assuming events must be tied to a user
      references: {
        model: 'users', // Table name
        key: 'id',     // Column in users table
      },
    },
    event_type: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    event_data: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'AnalyticsEvent',
    tableName: 'analytics_events',
    timestamps: true, // Handles timestamp column
    underscored: true, // Matches snake_case column names
  }
);
module.exports = AnalyticsEvent;