const connection = require('../Connection');
const Sequelize = require('sequelize');

const User = connection.Sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER, primaryKey: true
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'mvw_user'
});

module.exports = User;