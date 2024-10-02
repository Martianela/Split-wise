const { Op } = require('sequelize');
const Transaction = require('../Models/transaction.model');
const User = require('../Models/User.model');

const getAllTransactions = async (req, res) => {
  try {
    const transctions = await Transaction.findAll({});
    return res.status(200).json({
      success: true,
      message: 'transactions retrived successffullly',
      data: transctions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  getAllTransactions,
};
