

module.exports.run = async (client, msg, _) => {
    const doc = "Lista de comandos:\n" +
        "Para se registrar, digite: .a registrar \n" +
        "Adicionar uma conquista .a newConquista {NOMEDACONQUISTA} {PONTUACAO} \n" +
        "Mostrar leaderboard: .a leaderboard\n" +
        "Atribuir uma conquista pra alguém: .a setConquista {DISCORDTAG}/{NOMEDACONQUISTA}\n" +
        "Remover uma conquista de alguém: .a removeConquista {DISCORDTAG}/{NOMEDACONQUISTA}\n" +
        "Atualizar pontuação da conquista: .a updateConquista {NOMEDACONQUISTA}/{PONTUACAO}/{NOVONOMEDACONQUISTA} (Opcional)\n" +
        "Sincronizar pontuação e conquistas registradas manualmente: .a sincronizar\n";

    msg.channel.send(doc);
};