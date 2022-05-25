function applyExtraSetup(sequelize) {
    const { conquista, meguinha,  requisicao} = sequelize.models;
    meguinha.belongsToMany(conquista, {through: 'conquistasMeguinha'});
    conquista.belongsToMany(meguinha, {through: 'conquistasMeguinha'});
    conquista.belongsToMany(requisicao, {through: 'conquistasRequiscao'});
    requisicao.belongsToMany(requisicao, {through: 'conquistasRequiscao'});
}

module.exports = { applyExtraSetup };
