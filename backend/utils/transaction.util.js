const updateExpanseTransactions = async (expense, options) => {
  const Transaction = require('../Models/transaction.model');
  const { transaction } = options;
  const newAmount = expense.amount;
  try {
    const participants = await expense.getParticepents({ transaction });
    const numberOfMembers = participants.length;

    if (numberOfMembers === undefined || numberOfMembers === 0) {
      throw new Error('Member count is undefined or zero.');
    }
    const newAmountPerMember = newAmount / numberOfMembers;

    await Transaction.update(
      { amount: newAmountPerMember },
      { where: { expenseId: expense.expanse_id }, transaction }
    );
    console.log('Transactions updated successfully.');
  } catch (error) {
    console.error('Error updating transactions:', error);
    throw error;
  }
};

const createExpanseTransaction = async (expense, options) => {
  // const Expanse = require('../Models/expanse.model');
  const Groups = require('../Models/group.model');
  const Transaction = require('../Models/transaction.model');
  const User = require('../Models/User.model');
  const { transaction } = options;
  try {
    const newAmount = expense.amount;
    // const expanseWithMemberCount = await Expanse.findOne({
    //   where: {
    //     expanse_id: expense.expanse_id,
    //   },
    //   include: [
    //     {
    //       model: Groups,
    //       as: 'group',
    //       attributes: {
    //         include: [
    //           [
    //             sequelize.fn('COUNT', sequelize.col('group.members.id')),
    //             'memberCount',
    //           ],
    //         ],
    //       },
    //       include: [
    //         {
    //           model: User,
    //           as: 'members',
    //           attributes: ['id'],
    //         },
    //       ],
    //     },
    //   ],
    //   transaction,
    // });

    const groupMembers = await Groups.findOne({
      where: {
        g_id: expense.g_id,
      },
      attributes: [],
      include: [
        {
          model: User,
          as: 'members',
          attributes: ['id', 'username'],
          through: {
            attributes: [],
          },
        },
      ],
    });
    const numberOfMembers = groupMembers?.members?.length;
    if (numberOfMembers === undefined || numberOfMembers === 0) {
      throw new Error('Member count is undefined or zero.');
    }
    const newAmountPerMember = newAmount / numberOfMembers;
    const groupmembers = groupMembers.members;
    await expense.addParticepents(groupmembers, { transaction });
    const reciver = groupmembers.filter(
      (member) => member.username === expense.paidBy
    )[0];

    const transactionPromises = groupmembers.map((member) => {
      if (member.id !== reciver.id) {
        //console.log(member.id);
        return Transaction.create(
          {
            amount: newAmountPerMember,
            expenseId: expense.expanse_id,
            groupId: expense.g_id,
            payerId: member.id,
            receiverId: reciver.id,
          },
          { transaction }
        );
      }
    });

    await Promise.all(transactionPromises);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
module.exports = {
  updateExpanseTransactions,
  createExpanseTransaction,
};
