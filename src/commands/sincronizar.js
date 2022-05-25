const {createDiscordTag} = require('../utils')
const {
    getAllUsers,
    bulkUpsertUsers
} = require("../Repositories/UserRepository");
const {getAllAchievements} = require("../Repositories/AchievementRepository")
const {deburr} = require("lodash")
const unidecode = require('unidecode')

module.exports.run = async (client, msg, _) => {

    const guild = msg.channel.guild;
    const members = guild.members;
    try {
        const conquistas = await getAllAchievements();
        const conquistasNames = conquistas.map(c => searchString(c.dataValues.nome));
        const usersFromServer = Array.from(members.cache.values()).filter(user => !user.user.bot);
        const usersDiscordIds = (await getAllUsers()).map(user => user.discordId);

        const bulkInsertUsersObject = usersFromServer
            .filter(member => !usersDiscordIds.includes(member.user.id))
            .map(member => ({
                discordTag: createDiscordTag(member.user),
                discordId: member.user.id
            }));
        await bulkUpsertUsers(bulkInsertUsersObject);

        const users = await getAllUsers();

        for (const member of usersFromServer) {
            const discordTag = createDiscordTag(member.user);

            const userServerRoles = member._roles
                .map(r => member.guild.roles.cache.get(r))
                .map(r => searchString(r.name));

            const roles = userServerRoles
                .filter(v => conquistasNames.includes(v));

            const userConquistas = conquistas
                .filter(conquista => roles.includes(searchString(conquista.dataValues.nome)));

            const user = users.find(user => user.discordTag === discordTag);

            if (user) {
                await user.addConquista(userConquistas);
            }
        }
        msg.channel.send(`Sincronizado com sucesso ntj! 🤙`)
    } catch (e) {
        console.error(e);
        msg.channel.send(`ocorreu um erro liga no devops ${e.message}`);
    }
};

function searchString(str) {
    return unidecode(deburr(str.replaceAll(" ", "").toLocaleLowerCase()));
}
