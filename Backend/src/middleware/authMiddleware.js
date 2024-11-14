const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

exports.authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    // Verify the token using the same secret as in the login
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verify that the user exists in the database
    const user = await User.findByPk(verified.userId); 
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach the user to the request
    req.user = user;
    next(); 
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid or Expired Token' });
  }
};
