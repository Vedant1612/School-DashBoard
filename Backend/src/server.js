const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const sequelize = require('./db/index');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Initialize Express app
const app = express();

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);  
}

// CORS configuration to allow requests from frontend
app.use(cors({
  origin: 'http://localhost:5173', // Update as needed
}));

// Middleware to parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('uploads'));  

// Sync models with MySQL
sequelize.sync()
  .then(() => console.log('Database synchronized'))
  .catch(err => console.error('Failed to sync database:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);  // Keep student-related routes in studentRoutes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
