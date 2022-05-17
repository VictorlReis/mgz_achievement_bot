const {Conquista} = require("../models/conquista");

async function findAchievementByName(name) {
    return Conquista.findOne({ nome: name });
}

module.exports = {
    findAchievementByName
}