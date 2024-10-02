const Expanse = require('./expanse.model');
const Groups = require('./group.model');
const Transaction = require('./transaction.model');
const User = require('./User.model');

Groups.belongsToMany(User, {
  through: 'GruopMembers',
  as: 'members',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
User.belongsToMany(Groups, {
  through: 'GruopMembers',
  as: 'groups',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Groups.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });
User.hasMany(Groups, { foreignKey: 'createdBy' });

Transaction.belongsTo(User, { foreignKey: 'payerId', as: 'payer' });
Transaction.belongsTo(User, {
  foreignKey: 'receiverId',
  as: 'receiver',
});
Transaction.belongsTo(Groups, { foreignKey: 'groupId', as: 'group' });
Transaction.belongsTo(Expanse, {
  foreignKey: 'expenseId',
  as: 'expense',
});

Expanse.hasMany(Transaction, {
  foreignKey: 'expenseId',
  as: 'expenseTransactions',
});
Expanse.belongsToMany(User, {
  through: 'ExpanseParticipents',
  as: 'particepents',
  foreignKey: 'expanseId',
});

module.exports = {
  User,
  Groups,
  Expanse,
  Transaction,
};
