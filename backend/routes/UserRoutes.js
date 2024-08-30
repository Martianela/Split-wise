const express = require('express');

const {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserGroups,
  leveGroup,
} = require('../controllers/userController');
const userRoute = express.Router();

userRoute.get('/', getAllUsers);
userRoute.put('/update/:id', updateUser);
userRoute.delete('/delete/:id', deleteUser);
userRoute.get('/groups', getUserGroups);
userRoute.delete('/groups/:id', leveGroup);

module.exports = userRoute;
