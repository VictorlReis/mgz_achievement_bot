

module.exports.run = async (client, msg, _) => {
    const doc = "Lista de comandos:\n" +
        "Para se registrar, digite: !c registrar \n" +
        "Adicionar uma conquista !c newConquista {NOMEDACONQUISTA} {PONTUACAO} \n" +
        "Mostrar leaderboard: !c leaderboard\n" +
        "Atribuir uma conquista pra alguém: !c setConquista {DISCORDTAG}/{NOMEDACONQUISTA}\n" +
        "Remover uma conquista de alguém: !c removeConquista {DISCORDTAG}/{NOMEDACONQUISTA}\n" +
        "Atualizar pontuação da conquista: !c updateConquista {NOMEDACONQUISTA}/{PONTUACAO}\n" +
        "Requisitar um conquistas: !c requisitar  {NOMEDACONQUISTA}/{NOMEDACONQUISTA} (pode colocar quantas conquistas quiser separadas por /)\n" +
        "Sincronizar pontuação e conquistas registradas manualmente: !c sincronizar\n";

    msg.channel.send(doc);
};