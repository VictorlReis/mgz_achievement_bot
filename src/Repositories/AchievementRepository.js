const {models} = require('../Database');
const {conquista} = models;

async function findAchievementByName(name) {
    return conquista.findOne({where: {nome: name}});
}

async function findAchievementsByNames(names) {
    return conquista.findAll({where: {nome: names}});
}

async function getAllAchievements() {
    return conquista.findAll();
}

async function updateAchievementByName(name, updatedAchievement) {
    const actualConquista = await findAchievementByName(name);
    if (!actualConquista) {
        throw new Error("conquista não existe");
    }
    actualConquista.nome = updatedAchievement.nome;
    actualConquista.pontuacao = updatedAchievement.pontuacao;
    await actualConquista.save();
}

module.exports = {
    findAchievementByName,
    updateAchievementByName,
    getAllAchievements,
    findAchievementsByNames
}