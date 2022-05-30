const {MessageEmbed} = require("discord.js");

function validarParametros(params, numeroEsperado) {
    if (!params || params.length !== numeroEsperado) return 'parametros invalidos'
}

function createDiscordTag(author) {
    return author.username + "#" + author.discriminator;
}

function chunk(arr, len) {

    if (len === 0) throw new Error('chunks must have at least one range');

    let chunks = [],
        i = 0,
        n = arr.length;

    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }

    return chunks;
}

function createPages(userView, itemsPerPage, title, mapCallback) {
    const pages = chunk(userView, itemsPerPage);

    const pageViews = []

    pages.forEach((page, pageNumber) => {
        const embed = new MessageEmbed();
        embed.setTitle(title)
        embed.addFields(page.map((item, index) => mapCallback(item, index, pageNumber)))
        pageViews.push(embed)
    })

    return pageViews;
}

async function setDiscordRole(msg, achievementName, discordId) {
    const guild = msg.channel.guild;
    const role = guild.roles.cache.find(r => r.name === achievementName);
    const member = guild.members.cache.get(discordId);

    await member.roles.add(role);
}

module.exports = {
    validarParametros,
    createDiscordTag,
    createPages,
    setDiscordRole
}