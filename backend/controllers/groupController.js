const { logger } = require('sequelize/lib/utils/logger');
const sequelize = require('../connection');
const { Groups, User } = require('../Models/relationships');

const {
  findGroupByID,
  addUserBalanceToGroup,
} = require('../utils/group.utils');
const { Op } = require('sequelize');

const getAllGroups = async (req, res) => {
  const user_id = req.user_id;
  try {
    const allGroup = await Groups.findAll({
      attributes: ['g_id', 'title'],
      include: {
        model: User,
        as: 'members',
        where: { id: user_id },
        attributes: [],
      },
    });
    return res.status(200).json({
      success: true,
      message: 'group list retrived sucessfully',
      data: allGroup,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createGroup = async (req, res) => {
  const { title, desc, members } = req.body;
  const t = await sequelize.transaction();
  const user_id = req.user_id;
  try {
    console.time('transactionStart');
    if (title && user_id) {
      const newGroup = await Groups.create(
        {
          title: title,
          desc: desc || null,
          createdBy: req.username,
          members: [{ id: user_id }],
        },
        {
          transaction: t,
          user_id: user_id,
        }
      );
      const validMembers = await User.findAll({
        where: { username: members },
        transaction: t,
      });
      if (validMembers.length !== members.length) {
        await t.rollback();
        return res.status(400).json({
          success: true,
          message: 'bad request',
          error: 'Some users are invalid',
        });
      }
      await newGroup.addMembers(validMembers, { transaction: t });
      const groupWithMembers = await Groups.findByPk(newGroup.g_id, {
        include: [
          {
            model: User,
            as: 'members',
            attributes: ['username', 'id'],
            through: { attributes: [] },
          },
        ],
        transaction: t,
      });
      await t.commit();
      console.timeLog('transactionStart', 'Transaction committed');
      return res.json({
        success: true,
        message: 'group created successfully',
        data: groupWithMembers,
      });
    } else {
      await t.rollback();
      return res.status(400).json({ message: 'Title are required' });
    }
  } catch (error) {
    await t.rollback();
    return res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
};

const addMember = async (req, res) => {
  const { members } = req.body;
  const g_id = Number(req.params.id);
  try {
    const validMembers = await User.findAll({ where: { username: members } });
    if (validMembers.length !== members.length)
      return res.status(400).json({
        sucess: false,
        message: 'some users are invalid ',
      });

    const group = await findGroupByID(g_id);
    if (!group) return res.status(404).json({ messsage: 'group not found' });
    await group.addMember(validMembers);
    return res.json({
      success: true,
      messsage: 'members are added sucessfully',
    });
  } catch (error) {
    res.status(404).json({
      success: false,
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
    return res.status(200).json({
      success: true,
      message: 'details found successfully',
      data: group,
    });
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
    await group.save();
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
    return res.json({
      success: 'true',
      message: 'user is removerd from this group',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'something went Wrong',
      error: error.message,
    });
  }
};

const getNewMembersToAddInGroup = async (req, res) => {
  const user_id = req.user_id;
  const g_id = Number(req.params.id);
  try {
    if (g_id < 0 || isNaN(g_id)) {
      return res.status(400).json({ success: true, message: 'invalid g_id' });
    }
    const group = await Groups.findOne({ where: { g_id: g_id } });
    if (!group)
      return res.status(404).json({ scccess: false, error: 'Group not found' });
    console.log(group);

    if (!(await group.hasMember(user_id)))
      return res
        .status(400)
        .json({ scccess: false, error: 'your are not a member of this group' });
    const nonMembers = await User.findAll({
      where: {
        id: {
          [Op.notIn]: sequelize.literal(`(
            SELECT userId FROM gruopmembers WHERE GroupGId = ${g_id}
          )`),
        },
      },
      attributes: ['id', 'username'],
    });
    console.log(nonMembers);
    return res.status(200).json({
      success: true,
      message: 'Non members fetched successfully',
      data: nonMembers,
    });
  } catch (error) {
    return res.status(500).json({
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
  getNewMembersToAddInGroup,
};
