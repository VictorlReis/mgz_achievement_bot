const Meguinha = require("../models/meguinha");

async function findUserByDiscordId(discordId) {
    return Meguinha.findOne({ discordId });
}

async function findUserByDiscordTag(discordTag) {
    return Meguinha.findOne({ discordTag });
}

module.exports = {
    findUserByDiscordId,
    findUserByDiscordTag
}
