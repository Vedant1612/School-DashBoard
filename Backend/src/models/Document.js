const { DataTypes } = require('sequelize');
const sequelize = require('../db/index');
const User = require('./User');

const Document = sequelize.define('Document', {
  documentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  documentType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uploadedStatus: {
    type: DataTypes.ENUM('Uploaded', 'Not Uploaded'),
    defaultValue: 'Not Uploaded',
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Approval Pending', 'Approved', 'Rejected'),
    defaultValue: 'Approval Pending',
    allowNull: false,
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileData: {
    type: DataTypes.BLOB('long'), 
    allowNull: false,
  },
  uploadedBy: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

// Setting up the association
Document.belongsTo(User, { foreignKey: 'uploadedBy' });
User.hasMany(Document, { foreignKey: 'uploadedBy' });

module.exports = Document;
