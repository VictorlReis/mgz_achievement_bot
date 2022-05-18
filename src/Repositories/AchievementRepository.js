const {Conquista} = require("../models/conquista");

async function findAchievementByName(name) {
    return Conquista.findOne({nome: name});
}

async function updateAchievementByName(name, updatedAchievement) {
    await Conquista.findOneAndUpdate({nome: name}, {$set: updatedAchievement});
}

module.exports = {
    findAchievementByName,
    updateAchievementByName
}