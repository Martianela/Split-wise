const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const Groups = require('./group.model');
const User = require('./User.model');

const UserGroupBalance = sequelize.define(
  'UserGroupBalance',
  {
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'INR',
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: 'UserGroupBalances',
    timestamps: false,
  }
);

UserGroupBalance.belongsTo(Groups, {
  foreignKey: 'g_id',
  onDelete: 'CASCADE',
});
Groups.hasMany(UserGroupBalance, {
  foreignKey: 'g_id',
  onDelete: 'CASCADE',
});

UserGroupBalance.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
User.hasMany(UserGroupBalance, { foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = UserGroupBalance;
