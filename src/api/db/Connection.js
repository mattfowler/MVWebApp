const Sequelize = require('sequelize');

const databaseName = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

const sequelize = new Sequelize(databaseName, user, password, {
    host: host,
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 10,
        min: 2,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        insecureAuth: true
    }
});

exports.Sequelize = sequelize;