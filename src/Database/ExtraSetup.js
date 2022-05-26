function applyExtraSetup(sequelize) {
    const { conquista, meguinha,  requisicao} = sequelize.models;
    meguinha.belongsToMany(conquista, {through: 'conquistasMeguinha'});
    conquista.belongsToMany(meguinha, {through: 'conquistasMeguinha'});
    conquista.belongsToMany(requisicao, {through: 'conquistasRequisicao'});
    requisicao.belongsToMany(conquista, {through: 'conquistasRequisicao'});
}

module.exports = { applyExtraSetup };
