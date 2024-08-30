const sequelize = require('./connection');
require('./Models/relationships');
function main() {
  sequelize
    .sync({ force: true })
    .then(() => console.log('sync to database is completed'))
    .catch((err) => console.error('something went wrong ', err));
}

main();
