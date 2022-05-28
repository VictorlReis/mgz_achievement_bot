const {getAllUsers} = require("../../Repositories/UserRepository");
const {createPages} = require("../../functions/utils")
const paginationEmbed = require('discord.js-pagination');

module.exports.run = async (client, msg) => {
    const users = await getAllUsers();

    if (users.length === 0) {
        msg.channel.send('Nenhum usuario cadastrado');
        return;
    }

    const userView = users
        .map(user => {
            const serialUser = user.toJSON()
            return {
                name: serialUser.discordId, total: serialUser.conquista
                    .map(x => x.pontuacao)
                    .reduce((prev, cur) => prev + cur, 0)
            }
        })
        .filter(user => user.total !== 0)

    userView.sort((a, b) => b.total - a.total)
    const usersPerPage = 10;
    const mapCallback = (user, userIndex, pageNumber) => {
        const rank = userIndex + (pageNumber * usersPerPage) + 1;
        return {
            name: `${rank === 1 ? `👑 ${rank}` : rank}º`,
            value: `<@${user.name}> - ${user.total} pontos`
        }
    }
    const pages = createPages(userView, usersPerPage, `👑 OS MAIS MAIS 👑`, mapCallback);

    await paginationEmbed(msg, pages);
};
