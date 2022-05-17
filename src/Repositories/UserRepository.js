const Meguinha = require("../models/meguinha");

async function findUserByDiscordId(discordId) {
    return Meguinha.findOne({ discordId });
}

async function findUserByDiscordTag(discordTag) {
    return Meguinha.findOne({ discordTag });
}

async function getAllUsers() {
    return Meguinha.find({});
}

module.exports = {
    findUserByDiscordId,
    findUserByDiscordTag,
    getAllUsers
}
