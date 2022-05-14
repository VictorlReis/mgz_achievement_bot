const Discord = require("discord.js");


module.exports.run = async (client, msg, params) => {
    const doc = "Lista de comandos:\n" +
        "Registrar um usuário: .a registrar {DISCORDTAG} \n" +
        "Adicionar uma conquista .a newConquista {NOMEDACONQUISTA} {PONTUACAO} \n" +
        "Mostrar leaderboard: .a leaderboard\n" +
        "Atribuir uma conquista pra alguém: .a setConquista {DISCORDTAG}/{NOMEDACONQUISTA}\n" +
        "Remover uma conquista de alguém: .a removeConquista {DISCORDTAG} {NOMEDACONQUISTA}\n" +
        "Atualizar pontuação da conquista: .a updateConquita {NOMEDACONQUISTA}/{PONTUACAO}\n";

    msg.channel.send(doc);
};