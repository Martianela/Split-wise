const express = require('express');
const User = require('../Models/User.model');
const { login, createUser } = require('../controllers/userController');
const authRoutes = express.Router();

authRoutes.post('/login', login);
authRoutes.post('/register', createUser);

module.exports = authRoutes;
