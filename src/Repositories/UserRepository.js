const {models} = require('../Database');
const {createDiscordTag} = require("../functions/utils");
const {meguinha, conquista} = models;

async function findUserByDiscordId(discordId) {
    return meguinha.findOne({where: {discordId}, include: [conquista]});
}

async function findUserByDiscordTag(discordTag) {
    return meguinha.findOne({where: {discordTag}});
}

async function getAllUsers() {
    return meguinha.findAll({
        include: [conquista]
    });
}

async function bulkUpsertUsers(users) {
    await meguinha.bulkCreate(
        users,
        {
            fields: ['discordTag', 'discordId'],
            updateOnDuplicate: ['discordTag', 'discordId']
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
    registrarMeguinha,
    bulkUpsertUsers
}
