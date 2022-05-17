const {getAllUsers} = require("../Repositories/UserRepository");


module.exports.run = async (client, msg, params) => {
    const users = await getAllUsers();

    const usersView = [];
    for (let i = 0; i < users.length; i++) {
        let pontuacaoTotal = 0;

        users[i].conquistas.forEach(c => pontuacaoTotal += c.pontuacao);

        usersView.push({
            id: users[i].discordId,
            pontuacaoTotal
        });
    }

    var i = 1;
    usersView.forEach(x => {
        msg.channel.send(`${i}º <@${x.discordTag}> - ${x.pontuacaoTotal} pontos`);
        i++;
    });

};