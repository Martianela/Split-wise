const Expanse = require('./expanse.model');
const Groups = require('./group.model');
const User = require('./User.model');
const UserGlobalBalance = require('./UserGlobalBalance.model');
const UserGroupBalance = require('./UserGroupBalance.model');

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

Groups.belongsToMany(User, {
  through: UserGroupBalance,
  as: 'userBalance',
  foreignKey: 'g_id',
});

User.belongsToMany(Groups, {
  through: UserGroupBalance,
  as: 'groupBalances',
  foreignKey: 'user_id',
});

module.exports = {
  User,
  Groups,
  Expanse,
  UserGlobalBalance,
  UserGroupBalance,
};
