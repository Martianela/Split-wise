const express = require('express');
const {
  createExpanse,
  updateExpanse,
  deleteExpanse,
  getUserExpanse,
} = require('../controllers/expanseController');
const expanseRouter = express.Router();

expanseRouter.post('/', createExpanse);
expanseRouter.put('/:id', updateExpanse);
expanseRouter.delete('/:id', deleteExpanse);
expanseRouter.get('/', getUserExpanse);
module.exports = expanseRouter;
