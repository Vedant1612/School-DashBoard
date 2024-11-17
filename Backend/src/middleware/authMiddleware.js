const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

exports.authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 
  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(verified.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next(); 
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Invalid or Expired Token' });
  }
};
