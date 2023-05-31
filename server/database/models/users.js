// Import Dependencies
const { DataTypes } = require("sequelize");
const { db } = require("../index.js");

const { Posts }= require('../models/posts.js');


// Create Schema
const Users = db.define("users", {
  _id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
    autoIncrement: true,
  },
  googleId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fullName: {
    type: DataTypes.STRING(80),
    allowNull: false
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  _id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
    autoIncrement: true,
  },
  favoriteTrail: {
    type: DataTypes.STRING
  }
  // name: { type: DataTypes.STRING(80), allowNull: false },
  // password: {Type: DataTypes.STRING, allowNull: false}, (SANTO!!!!!!)
});


// Export Schema
module.exports = {
  Users,
};
