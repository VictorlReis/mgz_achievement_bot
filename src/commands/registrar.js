const Discord = require("discord.js");
const Meguinha = require('../models/meguinha');
const utils = require('../utils')

module.exports.run = async (client, msg, params) => {

    const doc = await registrarMeguinha(msg.author, params);
    msg.channel.send(doc);
};


async function registrarMeguinha(author) {
    const discordTag = author.username + "#" + author.discriminator;
    const discordId = author.id;

    if (await utils.usuarioJaRegistrado(discordId)) return "Usuário já registrado!";

    await Meguinha.create({discordId, discordTag});

    return "Usuário cadastrado com sucesso!";
}