const {models} = require('../Database');
const {meguinha} = models;
const {createDiscordTag} = require('../utils')
const {findUserByDiscordId} = require("../Repositories/UserRepository");

module.exports.run = async (client, msg, params) => {

    const doc = await registrarMeguinha(msg.author, params);
    msg.channel.send(doc);
};


async function registrarMeguinha(author) {
    const discordTag = createDiscordTag(author);
    const discordId = author.id;

    if (await findUserByDiscordId(discordId)) return "Usuário já registrado!";

    await meguinha.create({discordId, discordTag});

    return "Usuário cadastrado com sucesso!";
}