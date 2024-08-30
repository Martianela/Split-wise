const bcrypt = require('bcrypt');
const salt = 10;
const hashPassword = async (password) => {
  try {
    const hashPas = await bcrypt.hash(password, 10);
    console.log(hashPas);
    return hashPas;
  } catch (error) {
    throw new Error('error in hashPassword' + error);
  }
};

const verifyPassword = async (password, hashPass) => {
  try {
    const match = await bcrypt.compare(password, hashPass);
    console.log(match);
    return match;
  } catch (error) {
    throw new Error('password verification failed' + error);
  }
};

module.exports = { hashPassword, verifyPassword };
