const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('meguinha', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        discordTag: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        discordId: {
            allowNull: false,
            type: DataTypes.STRING,
        }
    });
};
