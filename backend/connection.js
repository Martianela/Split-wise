// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('splitwise', 'root', 'Jnv@2207', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;

// var databaseConnection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Jnv@2207',
//   database: 'splitwise',
// });

// module.exports = databaseConnection;
