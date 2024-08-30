const { Groups, User, Expanse } = require('../Models/relationships');
const { expanseValidationSchema } = require('../utils/expanse.util');

const createExpanse = async (req, res) => {
  const user_id = req.user_id;
  try {
    const { error, value } = expanseValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw new Error(`${error.details.map((x) => x.message).join(', ')}`);
    }
    const { title, desc, g_id, amount } = value;
    const group = await Groups.findByPk(Number(g_id));
    if (!group)
      return res
        .status(404)
        .json({ success: false, message: 'Invalid Group Id' });
    const user = await User.findByPk(Number(user_id));

    if (!(await group.hasMember(user)))
      return res.status(401).json({
        success: false,
        messsage: 'You are not a member of this Group',
      });

    const exp = await Expanse.create(
      {
        title,
        desc: desc || null,
        amount,
        paidBy: user.username,
        g_id: group.g_id,
      },
      {
        include: [
          {
            model: Groups,
            as: 'group',
            attributes: ['title'],
          },
        ],
      }
    );
    return res.status(200).json({
      success: true,
      message: 'expanse is added successfully',
      data: exp,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const updateExpanse = async (req, res) => {
  const user_id = req.user_id;
  const expanse_id = req.params.id;
  try {
    const { error, value } = expanseValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw new Error(`${error.details.map((x) => x.message).join(', ')}`);
    }
    const { title, desc, g_id, amount } = value;
    const expanse = await Expanse.findOne({
      where: { expanse_id },
      include: [
        {
          model: Groups,
          as: 'group',
          where: { g_id },
          include: {
            model: User,
            as: 'members',
            where: { id: user_id },
            attributes: ['id', 'username'],
          },
        },
      ],
    });

    if (!expanse) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found or you are not a member of this group',
      });
    }
    const group_title = expanse.group.title;
    if (expanse.paidBy !== req.username) {
      return res.status(401).json({
        success: false,
        error: 'You do not have permission to update this group',
      });
    }
    await expanse.update({ title, desc, amount });
    //const group = await expanse.getGroup({ attributes: ['title'] });
    return res.status(200).json({
      sucess: true,
      message: 'expanse is updated sucessfully',
      data: {
        expanse_id: expanse.expanse_id,
        title: expanse.title,
        desc: expanse.desc,
        paidBy: expanse.paidBy,
        amount: expanse.amount,
        group: group_title,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while updating the expense',
    });
  }
};
const deleteExpanse = async (req, res) => {
  const expanse_id = req.params.id;
  const user_id = req.user_id;
  try {
    const expanse = await Expanse.findOne({
      where: { expanse_id },
      include: [
        {
          model: Groups,
          as: 'group',
          include: {
            model: User,
            as: 'members',
            where: { id: user_id },
            attributes: ['id', 'username'],
          },
        },
      ],
    });

    if (!expanse) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found or you are not a member of this group',
      });
    }
    if (expanse.paidBy !== req.username) {
      return res.status(401).json({
        success: false,
        error: 'You do not have permission to update this group',
      });
    }
    await expanse.destroy();
    return res.status(200).json({
      success: true,
      message: 'expanse deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while deleting the expense',
    });
  }
};
module.exports = { createExpanse, updateExpanse, deleteExpanse };
