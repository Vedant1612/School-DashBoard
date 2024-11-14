const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => console.log('MySQL connected'))
  .catch(err => console.error('Unable to connect to MySQL:', err));

module.exports = sequelize;
