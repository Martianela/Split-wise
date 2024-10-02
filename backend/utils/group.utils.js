const Groups = require('../Models/group.model');
const User = require('../Models/User.model');

const findGroupByID = async (g_id) => {
  const group = await Groups.findByPk(g_id, {
    include: [
      {
        model: User,
        as: 'members',
        attributes: ['id', 'username', 'email', 'bio'],
        through: { attributes: [] },
      },
    ],
  });
  return group;
};

module.exports = {
  findGroupByID,
};
