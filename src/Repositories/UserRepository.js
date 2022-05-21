const {models} = require('../Database');
const {meguinha, conquista} = models;

async function findUserByDiscordId(discordId) {
    return meguinha.findOne({ where: { discordId } });
}

async function findUserByDiscordTag(discordTag) {
    return meguinha.findOne({ where: { discordTag } });
}

async function getAllUsers() {
    return meguinha.findAll({
        include : [conquista]
    });
}

module.exports = {
    findUserByDiscordId,
    findUserByDiscordTag,
    getAllUsers
}
