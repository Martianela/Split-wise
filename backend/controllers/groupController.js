const sequelize = require('../connection');
const { Groups, User, UserGroupBalance } = require('../Models/relationships');
const {
  findGroupByID,
  addUserBalanceToGroup,
} = require('../utils/group.utils');

const getAllGroups = async (req, res) => {
  try {
    const allGroup = await Groups.findAll();
    res.send(allGroup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createGroup = async (req, res) => {
  const { title, desc, createdBy } = req.body;
  const t = await sequelize.transaction();

  try {
    console.time('transactionStart');
    if (title && createdBy) {
      const user = await User.findOne({
        where: { id: Number(createdBy) },
        transaction: t,
      });
      console.timeLog('transactionStart', 'User findOne');

      if (!user) {
        await t.rollback();
        return res.status(404).json({ message: 'invalid username' });
      }

      const newGroup = await Groups.create(
        {
          title: title,
          desc: desc || null,
          createdBy: user.username,
        },
        { transaction: t }
      );
      console.timeLog('transactionStart', 'Group created');

      await newGroup.addMember(user.id, { transaction: t });
      console.timeLog('transactionStart', 'Member added');

      await addUserBalanceToGroup(user, newGroup, t);
      console.timeLog('transactionStart', 'User balance added');

      const groupWithMembers = await Groups.findByPk(newGroup.g_id, {
        include: [
          {
            model: User,
            as: 'members',
            attributes: ['username', 'email', 'bio'],
            through: { attributes: [] },
          },
        ],
        transaction: t,
      });
      console.timeLog('transactionStart', 'Group fetched');

      await t.commit();
      console.timeLog('transactionStart', 'Transaction committed');

      return res.json({
        success: true,
        message: 'group created successfully',
        data: groupWithMembers,
      });
    }
  } catch (error) {
    await t.rollback();
    return res.status(500).json({ message: error.message });
  }
};

const addMember = async (req, res) => {
  const { members } = req.body;
  const g_id = Number(req.params.id);
  try {
    const validMembers = await User.findAll({ where: { username: members } });
    //console.log(validMembers);
    if (validMembers.length !== members.length)
      throw new Error('some users are invalid');
    // const group = await Groups.findByPk(g_id, {
    //   include: {
    //     model: User,
    //     as: 'members',
    //     through: { attributes: [] },
    //     where: { username: members },
    //     required: false,
    //   },
    // });
    const group = await findGroupByID(g_id);
    if (!group) return res.status(404).json({ messsage: 'group not found' });
    // const existingMembers = group.members.map((mem) => mem.username);
    // const newMembers = validMembers.filter(
    //   (member) => !existingMembers.includes(member.username)
    // );
    const entry = await group.addMember(validMembers);
    return res.json({
      messsage: 'members are added sucessfully',
    });
  } catch (error) {
    res.status(404).json({
      message: 'someting went wrong',
      error: error.message,
    });
  }
};

const getGroupById = async (req, res) => {
  const g_id = Number(req.params.id);
  try {
    const group = await findGroupByID(g_id);
    if (!group) return res.status(404).json({ message: 'group not found' });
    res.send(group);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const updateGroup = async (req, res) => {
  const { title, desc } = req.body;
  const g_id = Number(req.params.id);
  try {
    const group = await Groups.findByPk(g_id);
    if (!group) return res.status(404).json({ message: 'Group not found' });
    if (title) group.title = title;
    if (desc) group.desc = desc;
    group.save();
    return res.status(200).json({
      sucess: true,
      message: 'group updated successfully',
      data: group,
    });
  } catch (error) {
    res
      .status(404)
      .json({ message: 'something went wront', error: error.message });
  }
};

const deleteGroup = async (req, res) => {
  const g_id = Number(req.params.id);
  try {
    const group = await Groups.findByPk(g_id);
    if (!group) throw new Error('group not found');
    group.destroy();
    return res.json({
      message: 'group delted successfully',
    });
  } catch (error) {
    return res.status(404).json({
      message: 'something went Wrong',
      error: error.message,
    });
  }
};

const deleteMember = async (req, res) => {
  const g_id = Number(req.params.g_id);
  const username = req.params.username;
  try {
    const group = await findGroupByID(g_id);
    const user = await User.findOne({ where: { username: username } });
    if (!group) throw new Error('Group not found');
    if (!user) throw new Error('User not found');
    const isMember = group.members.some((member) => member.id === user.id);
    if (!isMember) throw new Error('user is not a member of this group');
    await group.removeMember(user);
    return res.json({ message: 'user is removerd from this group' });
  } catch (error) {
    return res.status(404).json({
      message: 'something went Wrong',
      error: error.message,
    });
  }
};

module.exports = {
  getAllGroups,
  createGroup,
  addMember,
  getGroupById,
  updateGroup,
  deleteGroup,
  deleteMember,
};
