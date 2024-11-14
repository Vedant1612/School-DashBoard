const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model

// Middleware to authenticate the user
exports.authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    // Verify the token using the secret stored in .env file
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Verify that the user exists in the database based on the userId from the token
    const user = await User.findByPk(verified.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach the user object to the request to be used in subsequent middleware
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Invalid or Expired Token' });
  }
};
