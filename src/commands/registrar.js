const Discord = require("discord.js");
const Meguinha = require('../models/meguinha');
const utils = require('../utils')

module.exports.run = async (client, msg, params) => {
    const doc = await registrarMeguinha();

    msg.channel.send(doc);
};


async function registrarMeguinha(params) {

    if (!params || params.length !== 1) return 'parametros invalidos';

    if (await utils.usuarioJaRegistrado(params[0])) return "Usuário já registrado!";

    await Meguinha.create({discordTag: params[0]});

    return "Usuário cadastrado com sucesso!";
}