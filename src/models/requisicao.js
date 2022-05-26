const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('requisicao', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        idMensagem: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        discordId: {
            allowNull: false,
            type: DataTypes.STRING,
        }
    });
};