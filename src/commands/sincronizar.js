const {createDiscordTag} = require('../utils')
const {
    getAllUsers,
    bulkUpsertUsers
} = require("../Repositories/UserRepository");
const {getAllAchievements} = require("../Repositories/AchievementRepository")

module.exports.run = async (client, msg, _) => {

    const guild = msg.channel.guild;
    const members = guild.members;
    try {
        const conquistas = await getAllAchievements();
        const usersFromServer = Array.from(members.cache.values()).filter(user => !user.bot);
        const bulkInsertUsersObject = usersFromServer
            .map(member => ({
                discordTag: createDiscordTag(member.user),
                discordId: member.user.id
            }));
        await bulkUpsertUsers(bulkInsertUsersObject, ["discordTag"]);
        const users = await getAllUsers();

        for (const member of usersFromServer) {
            const discordTag = createDiscordTag(member.user);
            const roles = Array.from(member._roles.values())
                .filter(v => conquistas.map(v => v.nome).includes(v));
            const userConquistas = conquistas.filter(conquista => roles.includes(conquista.nome));
            const user = users.find(user => user.discordTag === discordTag);
            user?.addConquistas(userConquistas)
                .then()
                .catch(e => msg.channel.send(`ocorreu um erro liga no devops ${e.message}`))
        }
        msg.channel.send(`Sincronizado com sucesso ntj! 🤙`)
    } catch (e) {
        console.error(e);
        msg.channel.send(`ocorreu um erro liga no devops ${e.message}`);
    }
};
