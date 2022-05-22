const {models} = require('../Database');
const {createDiscordTag} = require("../utils");
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

async function registrarMeguinha(user) {
    const discordTag = createDiscordTag(user);
    const discordId = user.id;

    if (await findUserByDiscordId(discordId)) return "Usuário já registrado!";

    await meguinha.create({discordId, discordTag});

    return "Usuário cadastrado com sucesso!";
}

module.exports = {
    findUserByDiscordId,
    findUserByDiscordTag,
    getAllUsers,
    registrarMeguinha
}
