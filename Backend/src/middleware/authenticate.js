const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

exports.authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    // Verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verify that the user exists in the database
    const user = await User.findByPk(verified.userId); 
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach the user to the request object
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or Expired Token' });
  }
};
