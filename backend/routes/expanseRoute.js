const express = require('express');
const {
  createExpanse,
  updateExpanse,
  deleteExpanse,
} = require('../controllers/expanseController');
const expanseRouter = express.Router();

expanseRouter.post('/', createExpanse);
expanseRouter.put('/:id', updateExpanse);
expanseRouter.delete('/:id', deleteExpanse);

module.exports = expanseRouter;
