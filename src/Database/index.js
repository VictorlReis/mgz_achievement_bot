const {Sequelize} = require('sequelize');
const {applyExtraSetup} = require('./ExtraSetup');
const {connectionString} = require('../../config.json');

const sequelize = new Sequelize(connectionString, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: (...msg) => console.log(msg)
});

const modelDefiners = [
    require('../models/conquista'),
    require('../models/meguinha'),
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

applyExtraSetup(sequelize);

module.exports = sequelize;