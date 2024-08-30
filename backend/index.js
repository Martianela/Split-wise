require('dotenv').config();
const app = require('./app');
const sequelize = require('./connection');

sequelize
  .authenticate()
  .then(() => {
    console.log('databse connection made successfully');
  })
  .catch((err) => console.error('somthing went wrong ', err));

app.listen('3000', () => {
  console.log('listining of port');
});
