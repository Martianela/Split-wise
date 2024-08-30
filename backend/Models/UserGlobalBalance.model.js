const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const User = require('./User.model');

const UserGlobalBalance = sequelize.define(
  'UserGlobalBalance',
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
    tableName: 'UserGlobalBalances',
    timestamps: false,
  }
);

UserGlobalBalance.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasOne(UserGlobalBalance, {
  foreignKey: 'user_id',
  as: 'balance',
  onDelete: 'CASCADE',
});

module.exports = UserGlobalBalance;
