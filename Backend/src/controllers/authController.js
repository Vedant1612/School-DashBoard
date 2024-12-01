const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup Controller
exports.signup = async (req, res) => {
  try {
    const { username, firstName, lastName, email, mobile, password, role } = req.body;

    // Validate role
    const validRoles = ['student', 'admin'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Check if the user already exists (check for email)
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create a new user in the database
    const newUser = await User.create({ 
      username,
      firstName,
      lastName,
      email,
      mobile,
      password, // Storing password as plain text
      role
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'User registration failed' });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Find the user by username, mobile, or email
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username }, { mobile: username }, { email: username }]
      }
    });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Check if role matches
    if (user.role !== role) {
      return res.status(400).json({ error: 'Role does not match' });
    }

    // Compare passwords (plain text comparison)
    if (user.password !== password) {
      return res.status(400).json({ error: 'Invalid Username or Password!!😞' });
    }

    // Generate a JWT token with user ID and role
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token as response
    res.json({ message: 'Login successful', token, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'User login failed' });
  }
};
