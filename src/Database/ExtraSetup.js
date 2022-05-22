function applyExtraSetup(sequelize) {
    const { conquista, meguinha } = sequelize.models;
    console.log('fiz relationship')
    meguinha.belongsToMany(conquista, {through: 'conquistasMeguinha'});
    conquista.belongsToMany(meguinha, {through: 'conquistasMeguinha'});
}

module.exports = { applyExtraSetup };
