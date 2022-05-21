const {getAllUsers} = require("../Repositories/UserRepository");

module.exports.run = async (client, msg) => {
    const users = await getAllUsers();

    const userView = users.map(user => {
        const serialUser = user.toJSON()
        return {
            name: serialUser.discordTag,
            total: serialUser.conquista
                .map(x => x.pontuacao)
                .reduce((prev, cur) => prev + cur, 0)
        }
    })

    userView.sort((a, b) => a.total - b.total)

    userView.forEach((user, index) => {
        msg.channel.send(`${index + 1}º <@${user.name}> - ${user.total} pontos`);
    })
};