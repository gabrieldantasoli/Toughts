const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('toughts', 'root', '201000267165', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('Sucessfuly Database Connection!');
} catch (err) {
    console.log('Fail to Database Connection!');
}

module.exports = sequelize;