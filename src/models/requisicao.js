const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('conquista', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        nome: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        pontuacao: {
            allowNull: false,
            type: DataTypes.INTEGER,
        }
    });
};