const { Op } = require('sequelize'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

// Signup Controller
exports.signup = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body; 

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } }); 
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await User.create({ name, email, mobile, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'User registration failed' });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body; 

    // Find the user by mobile or name
    const user = await User.findOne({
      where: {
        [Op.or]: [{ mobile: username }, { name: username }] 
      }
    });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generate a JWT token with user ID and role
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token as response
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'User login failed' });
  }
};

