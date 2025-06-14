const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcrypt');

class User extends Model {
  static async getByEmail(email) {
    return await this.findOne({ where: { email } });
  }
  
  static async getByParentEmail(parentEmail) {
    return await this.findOne({ where: { parent_email: parentEmail } });
  }

  async checkPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_login_at: {
      type: DataTypes.DATE,
    },
    earned_points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    game_level: {
      type: DataTypes.INTEGER,
    },
    parent_email: {
      type: DataTypes.STRING,
      unique: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      }
    }
  }
);

module.exports = User;
