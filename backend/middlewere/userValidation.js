const jwt = require('jsonwebtoken');

const validateUser = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token)
    return res
      .status(401)
      .json({ message: 'Authentication token is required' });
  try {
    const tokenString = token?.substring(7);
    const user = jwt.verify(tokenString, process.env.JWT_SECRET);
    req.user_id = user.id;
    req.username = user.username;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token',
      error: error.message,
    });
  }
};

const genrateToken = (payload) => {
  const secrate = process.env.JWT_SECRET;
  console.log(secrate);

  const options = {
    expiresIn: '1hr',
  };
  const token = jwt.sign(payload, secrate, options);

  return token;
};

module.exports = {
  validateUser,
  genrateToken,
};
