const Joi = require('joi');

const getUser = (user) => {
  const { username, id } = user;
  return { username, id };
};

const getUserFull = (user) => {
  return { username, id, email, password, bio };
};

const userValidationSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(16).required(),
  bio: Joi.string().allow(null).default(null),
});
module.exports = {
  getUser,
  getUserFull,
  userValidationSchema,
};
