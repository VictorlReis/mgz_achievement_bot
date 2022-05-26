const {validarParametros, setDiscordRole} = require('../../utils')
const {findUserByDiscordTag} = require("../../Repositories/UserRepository");
const {findAchievementByName} = require("../../Repositories/AchievementRepository");

module.exports = {
    run,
    setConquista
}

async function run(client, msg, params) {
    try {
        const output = await setConquista(msg, params);
        msg.channel.send(output);
    } catch (err) {
        msg.channel.send(`ocorreu um erro liga no devops ${err.message}`);
    }
}

async function setConquista(msg, params) {
    const paramValido = validarParametros(params, 2);
    if (paramValido) return paramValido;

    const [discordTag, achievementName] = params;

    const user = await getUser(discordTag);
    if (!user) return "Discord Tag inválido ou não cadastrado";

    const achievement = await getAchievement(achievementName);

    if (!achievement) return `Conquista não cadastrada.`;

    await user.addConquista(achievement);
    setDiscordRole(msg, achievementName, user.discordId);

    return `<@${user.discordId}> agora tem a conquista ${achievementName} parabéns!!!`
}

async function getUser(discordTag) {
    if (!discordTag) return undefined;
    return await findUserByDiscordTag(discordTag);
}

async function getAchievement(achievementName) {
    if (!achievementName) return undefined;
    return await findAchievementByName(achievementName);
}

