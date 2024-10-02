const express = require('express');

const {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserGroups,
  leveGroup,
  getUserTransctions,
} = require('../controllers/userController');
const userRoute = express.Router();

userRoute.get('/', getAllUsers);
userRoute.put('/update/:id', updateUser);
userRoute.delete('/delete/:id', deleteUser);
userRoute.get('/groups', getUserGroups);
userRoute.delete('/groups/:id', leveGroup);
userRoute.get('/transaction', getUserTransctions);

module.exports = userRoute;
