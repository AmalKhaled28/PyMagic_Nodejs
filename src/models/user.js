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

class User extends Model {
  static async getByEmail(email) {
    return await this.findOne({ where: { email } })
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    avatarId: {
      type: DataTypes.INTEGER,
      field: 'avatar_id'
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      field: 'last_login_at'
    },
    earnedPoints: {
      type: DataTypes.INTEGER,
      field: 'earned_points'
    },
    gameLevel: {
      type: DataTypes.INTEGER,
      field: 'game_level'
    },
    parentEmail: {
      type: DataTypes.STRING,
      field: 'parent_email'
    },
    age: {
      type: DataTypes.INTEGER
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  }
);

module.exports = User;