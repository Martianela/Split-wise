const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const User = require('./User.model');

const Groups = sequelize.define('Groups', {
  g_id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'username',
    },
    onDelete: 'SET NULL',
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
  },
});

module.exports = Groups;
