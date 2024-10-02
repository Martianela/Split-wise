const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const Expanse = require('./expanse.model');
const User = require('./User.model');

const Transaction = sequelize.define(
  'Transaction',
  {
    transactionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'INR',
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    payerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,

        key: 'id',
      },
      onDelete: 'CASCADE',
      index: true,
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
      index: true,
    },
    groupId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Groups',
        key: 'g_id',
      },
      onDelete: 'CASCADE',
    },
    expenseId: {
      type: DataTypes.INTEGER,
      references: {
        model: Expanse,
        key: 'expanse_id',
      },
      onDelete: 'CASCADE',
    },
    status: {
      type: DataTypes.ENUM('pending', 'done'),
      allowNull: false,
      defaultValue: 'pending',
    },
    setlledAt: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },
  {
    tableName: 'transactions',
    timestamps: false,
  }
);

Transaction.beforeUpdate(async (transaction, options) => {
  if (transaction.status === 'done' && !transaction.settledAt) {
    try {
      await transaction.update(
        { settledAt: new Date() },
        { transaction: options.transaction }
      );
    } catch (error) {
      console.error('Error updating settledAt:', error);
      throw error;
    }
  }
});

module.exports = Transaction;
