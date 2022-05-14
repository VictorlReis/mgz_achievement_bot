const Discord = require("discord.js");
const Conquista = require('../models/conquista');
const { validarConquista, validarParametros } = require('../utils')


module.exports.run = async (client, msg, params) => {
    const doc = registrarConquista(params);

    msg.channel.send(doc);
};


async function registrarConquista(params) {
    const paramValido = validarParametros(params, 2);

    if (paramValido) return paramValido;

    const [nome, pontuacao, ...xs] = params;


    if (await validarConquista(nome)) return "Conquista já registrada!";

    Conquista.create({ nome, pontuacao });

    return "Conquista cadastrada com sucesso!";
}