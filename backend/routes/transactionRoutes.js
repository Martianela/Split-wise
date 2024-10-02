const express = require('express');
const { getAllTransactions } = require('../controllers/transactionController');
const transactionRoutes = express.Router();

transactionRoutes.get('/', getAllTransactions);

module.exports = transactionRoutes;
