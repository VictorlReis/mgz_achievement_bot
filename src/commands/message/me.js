const {findUserByDiscordId} = require("../../Repositories/UserRepository");
const {createPages} = require("../../functions/utils");
const paginationEmbed = require('discord.js-pagination');

module.exports.run = async (client, msg) => {
    const user = await findUserByDiscordId(msg.author.id);

    if (!user) {
        msg.channel.send('Usuario não cadastrado');
        return;
    }

    const mapCallback = (conquista, _, __) => {
        return {
            name: conquista.dataValues.nome,
            value: `${conquista.dataValues.pontuacao} pontos`
        }
    }
    const itemsPerPage = 15;
    const pages = createPages(user.conquista, itemsPerPage, `Suas Conquistas`, mapCallback);
    await paginationEmbed(msg, pages);
};