const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./ExtraSetup');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'mgz_achievement_bot/db.sqlite',
    logQueryParameters: true,
    benchmark: true,
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