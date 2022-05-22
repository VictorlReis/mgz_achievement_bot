const {getAllUsers} = require("../Repositories/UserRepository");
const {chunk} = require("../utils")
const {MessageEmbed} = require('discord.js');
const paginationEmbed = require('discord.js-pagination');

module.exports.run = async (client, msg) => {
    const users = await getAllUsers();

    const userView = users.map(user => {
        const serialUser = user.toJSON()
        return {
            name: serialUser.discordId,
            total: serialUser.conquista
                .map(x => x.pontuacao)
                .reduce((prev, cur) => prev + cur, 0)
        }
    })

    userView.sort((a, b) => a.total - b.total)

    const pages = createPages(userView);

    await paginationEmbed(msg, pages);
};


function createPages(userView) {
    const pages = chunk(userView, 5);

    const pageViews = []

    pages.forEach((page, index) => {
        const embed = new MessageEmbed();
        embed.setTitle(`👑 OS MAIS MAIS 👑`)
        embed.addFields(
            page.map((user, userIndex) => {
                const rank = userIndex + index + 1;
                return {
                    value: `${rank === 1 ? `👑 ${rank}` : rank}º <@${user.name}> - ${user.total} pontos`
                }
            })
        )
        pageViews.push(embed)
    })

    return pageViews;
}