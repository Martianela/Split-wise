const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const User = require('./User.model');
const Groups = require('./group.model');
const {
  updateExpanseTransactions,
  createExpanseTransaction,
} = require('../utils/transaction.util');

const Expanse = sequelize.define('Expanse', {
  expanse_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  isSetteled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  paidBy: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: 'username',
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
  },
  g_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Groups,
      key: 'g_id',
    },
    allowNull: false,
  },
});

Groups.hasMany(Expanse, { foreignKey: 'g_id', as: 'expanses' });
Expanse.belongsTo(Groups, {
  foreignKey: 'g_id',
  as: 'group',
  onDelete: 'CASCADE',
});

Expanse.afterUpdate(updateExpanseTransactions);
Expanse.afterCreate(createExpanseTransaction);

module.exports = Expanse;
