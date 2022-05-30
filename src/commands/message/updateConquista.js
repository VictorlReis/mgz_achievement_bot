const {validarParametros} = require("../../functions/utils");
const {updateAchievementByName} = require("../../Repositories/AchievementRepository");

module.exports.run = async (client, msg, params) => {
    const output = await updateConquista(params);

    msg.channel.send(output);
};

async function updateConquista(params) {
    const paramValido = validarParametros(params, 2);

    if (paramValido) return paramValido;

    const [nome, pontuacao] = params;

    try {
        await updateAchievementByName(nome, {nome, pontuacao});
    } catch (error) {
        return `ocorreu um erro liga no devops ${error.message}`;
    }

    return `Conquista ${nome} atualizada para pontuação ${pontuacao}`

}
