const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const sequelize = require('./db/index');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);  
}

app.use(cors({
  origin: 'http://localhost:5173', 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('uploads'));  

sequelize.sync()
  .then(() => console.log('Database synchronized'))
  .catch(err => console.error('Failed to sync database:', err));

app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);  
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
