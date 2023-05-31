const { DataTypes } = require('sequelize');
const { db } = require('../index.js');
const { Users } = require('./users.js');

const Stories = db.define('Stories', {
  story: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

Stories.belongsTo(Users, {
  foreignKey: '_id',
  onDelete: 'CASCADE'
});

Users.hasMany(Stories);

Stories.sync();

module.exports = {
  Stories,
};