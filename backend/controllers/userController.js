const { Op } = require('sequelize');
const { genrateToken } = require('../middlewere/userValidation');
const { User, Groups, Transaction } = require('../Models/relationships');
const { hashPassword, verifyPassword } = require('../utils/password.utils');
const { getUser, userValidationSchema } = require('../utils/user.utils');

const createUser = async (req, res) => {
  try {
    const { error, value } = userValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw new Error(
        `Validation error: ${error.details.map((x) => x.message).join(', ')}`
      );
    }
    const { username, email, password, bio } = value;
    if (username && email && password) {
      const user = await User.findOne({
        where: {
          [Op.or]: {
            username: username,
            email: email,
          },
        },
      });
      console.log(user);

      if (user)
        return res.status(401).json({
          success: false,
          message: 'username or email is already in use',
        });
      const newUser = User.build({
        username: username,
        email: email,
        password: await hashPassword(password),
        bio: bio || null,
      });
      await newUser.save();
      return res
        .status(200)
        .json({ success: true, message: 'user registered successfully' });
    }
    return res.status(401).json({
      success: false,
      message: 'invalid inputs',
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      messsage: 'user registration failed',
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  const user_id = req.user_id;
  try {
    const UsersList = await User.findAll({
      attributes: ['id', 'username'],
    });
    const filteredUsers = UsersList.filter((user) => user.id !== user_id);

    return res.status(200).json({
      success: true,
      message: 'User list retrieved successfully',
      data: filteredUsers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username && password) {
      const user = await User.findOne({
        where: { username: username },
      });
      if (!user)
        return res
          .status(401)
          .json({ success: false, message: 'Invalid username' });
      const verifed = await verifyPassword(password, user?.password);
      if (user && verifed) {
        const payload = {
          id: user.id,
          username: user.username,
          email: user.email,
          bio: user.bio,
        };

        const token = genrateToken(payload);
        //res.cookie('token', token, { httpOnly: true, secure: true });
        return res.json({
          success: true,
          message: 'user loggged in successfully',
          data: payload,
          token: token,
        });
      } else {
        return res
          .status(401)
          .json({ success: false, message: 'invalid username or password' });
      }
    } else {
      return res
        .status(401)
        .json({ success: false, message: 'invalid username or password' });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'something went wront',
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const id = Number(req.params.id);
  if (req.user_id !== id)
    return res.status(401).json({
      message: 'invalid User',
    });
  const { username, email, bio } = req.body;
  try {
    const user = await User.findOne({ where: { id: Number(id) } });
    if (!user) return res.status(404).json({ message: 'user not found' });
    if (username) user.username = username;
    if (email) user.email = email;
    if (bio) user.bio = bio;
    await user.save();

    res.json({
      message: 'sucess',
      data: getUser(user),
    });
  } catch (error) {
    return res.status(401).json({
      message: 'username and email must be unique',
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const id = Number(req.params.id);

  if (req.user_id !== id)
    return res.status(401).json({
      message: 'invalid User',
    });
  try {
    const user = await User.findByPk(id);
    if (!user) throw new Error('invalid user id');
    await user.destroy();
    res.json({ message: 'user is deleted successfully' });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

const getUserGroups = async (req, res) => {
  const user_id = req.user_id;
  try {
    const user = await User.findByPk(user_id, {
      attributes: { exclude: ['password'] },
      include: {
        model: Groups,
        as: 'groups',
        attributes: ['g_id', 'title', 'desc', 'createdAt'],
        through: { attributes: [] },
      },
    });
    res.json({
      success: true,
      message: 'user group factched successfully',
      data: user.groups,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const leveGroup = async (req, res) => {
  const user_id = req.user_id;
  const g_id = Number(req.params.id);
  try {
    if (isNaN(g_id) || g_id <= 0) throw new Error('Invalid group id');
    const user = await User.findByPk(user_id);
    const group = await Groups.findByPk(g_id);
    if (!group || !user) throw new Error('User or Group not found');
    await user.removeGroup(group);
    return res.json({
      success: true,
      message: 'You have successfully removed from the group',
    });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
const getUserTransctions = async (req, res) => {
  const user_id = req.user_id;
  try {
    const userTnx = await Transaction.findAll({
      where: {
        [Op.or]: [
          {
            payerId: user_id,
          },
          {
            receiverId: user_id,
          },
        ],
      },
      include: [
        {
          model: User,
          as: 'payer',
          attributes: ['username'],
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['username'],
        },
      ],
    });
    return res.status(200).json({
      success: true,
      message: 'transaction successfully',
      data: userTnx,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
module.exports = {
  createUser,
  getAllUsers,
  login,
  updateUser,
  deleteUser,
  getUserGroups,
  leveGroup,
  getUserTransctions,
};
