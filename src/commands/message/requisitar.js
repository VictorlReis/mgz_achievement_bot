const {findAchievementsByNames} = require("../../Repositories/AchievementRepository");
const {createRequest} = require("../../Repositories/RequestRepository");
module.exports.run = async (client, msg, params) => {
    const userId = msg.author.id

    const achievements = await findAchievementsByNames(params)

    const achievementsPrintable = achievements.reduce((prev, cur) => {
        return `${prev.toJSON().nome}\n`+`${cur.toJSON().nome}\n`
    })

    const sentMsg = await msg.channel.send(`<@${userId}> requisitou: \n${achievementsPrintable}`)
    await sentMsg.react("✅")
    await sentMsg.react("❎")

    const request = await createRequest({
        idMensagem: sentMsg.id,
        discordId: userId
    })

    await request.addConquista(achievements)
}