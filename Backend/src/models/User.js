const { DataTypes } = require('sequelize');
const sequelize = require('../db/index');

const User = sequelize.define(
  'User',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 20],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[0-9]{10}$/,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'student',
      validate: {
        isIn: [['student', 'admin']],
      },
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
      type: DataTypes.JSON,
      allowNull: true,
      // defaultValue: {
      //   street: '',
      //   city: '',
      //   state: '',
      //   zipCode: '',
      // },
      // validate: {
      //   isValidAddress(value) {
      //     const requiredFields = ['street', 'city', 'state', 'zipCode'];
      //     requiredFields.forEach((field) => {
      //       if (!value[field] || typeof value[field] !== 'string') {
      //         throw new Error(`Invalid or missing field in address: ${field}`);
      //       }
      //     });
      //   },
      // },
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
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '/path/to/default/profilePic.png',
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

module.exports = User;
