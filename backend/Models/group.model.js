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

Groups.afterCreate(async (group, options) => {
  const { user_id, transaction } = options;
  try {
    if (!user_id)
      throw new Error(
        'User id not defined. occured while executing afterCreate hook'
      );
    await group.addMember(user_id, { transaction });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
});

module.exports = Groups;
