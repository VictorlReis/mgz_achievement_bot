const {findAchievementsByNames} = require("../../Repositories/AchievementRepository");
const {createRequest} = require("../../Repositories/RequestRepository");
const {getUserAchievements} = require("../../Repositories/UserRepository");
const {REACTIONS} = require("../../constants");
module.exports.run = async (client, msg, params) => {
    const userId = msg.author.id

    const achievements = await findAchievementsByNames(params)

    const achievementsPrintable = achievements
        .map(a => a.toJSON().nome)
        .reduce((prev, cur) => {
        return `${prev}\n` + `${cur}\n`
    },"");

    const userAchievements = await getUserAchievements(msg.author.id);
    const alreadyHasAchievement = userAchievements
        .map(nameAchievements => nameAchievements.toJSON().nome)
        .filter(userAchievements => achievements.map(achiev => achiev.toJSON().nome).includes(userAchievements));

    if (alreadyHasAchievement.length > 0) {
        msg.channel.send(`Porra irmão, me ajuda a te ajudar, você já tem a(s) conquista(s): ${alreadyHasAchievement}`);
    } else {
        const sentMsg = await msg.channel.send(`<@${userId}> requisitou: ${achievementsPrintable}`)
        await sentMsg.react(REACTIONS.CONFIRM)
        await sentMsg.react(REACTIONS.REJECT)

        const request = await createRequest({
            idMensagem: sentMsg.id,
            discordId: userId
        })

        await request.addConquista(achievements)
    }
}