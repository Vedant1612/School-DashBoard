const { DataTypes } = require('sequelize');
const sequelize = require('../db/index');
const User = require('./User'); 

const Document = sequelize.define('Document', {
  documentType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileName: {
    type: DataTypes.STRING,
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
