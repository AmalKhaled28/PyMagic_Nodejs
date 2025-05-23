// const db = require('../config/db');

// const User = {
//   // Insert a new user record.
//   create: (userData, callback) => {
//     const sql = 'INSERT INTO User (name, email, password, parentEmail, age, pointsEarned, gameLevel) VALUES (?, ?, ?, ?, ?, 0, 1)';
//     const values = [userData.name, userData.email, userData.password, userData.parentEmail, userData.age];
//     db.query(sql, values, callback);
//   },

//   // Retrieve a user record by user ID.
//   findById: (id, callback) => {
//     const sql = 'SELECT * FROM User WHERE userId = ?';
//     db.query(sql, [id], callback);
//   },

//   // Retrieve a user record by email.
//   findByEmail: (email, callback) => {
//     const sql = 'SELECT * FROM User WHERE email = ?';
//     db.query(sql, [email], callback);
//   },

//   // Update the last login time for a user.
//   updateLastLogin: (id, callback) => {
//     const sql = 'UPDATE User SET lastLogin = NOW() WHERE userId = ?';
//     db.query(sql, [id], callback);
//   },

//   // Update user information based on user ID.
//   updateById: (id, updateData, callback) => {
//     const sql = 'UPDATE User SET name = ?, email = ? WHERE userId = ?';
//     const values = [updateData.name, updateData.email, id];
//     db.query(sql, values, callback);
//   }
// };

// module.exports = User;

// • create
// • findByPk
// • findOne
// • findAll
// • update
// • destroy
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
