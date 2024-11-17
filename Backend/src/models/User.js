const { DataTypes } = require('sequelize');
const sequelize = require('../db/index');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,  
    unique: true,   
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,      
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,   
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'student', // Default role
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,  
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,  
  },
  fathersName: {
    type: DataTypes.STRING,
    allowNull: true,   
  },
  mothersName: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  profilePic: {
    type: DataTypes.STRING, // Path to profile picture.........need to work on it...............
    allowNull: true,        
  },
});

module.exports = User;
