const {validarParametros} = require('../../utils')
const {baixarArquivoCSV, getJsonFromCSVFile} = require("../../Repositories/FileRepository");
const {models} = require('../../Database');
const {findAchievementByName} = require("../../Repositories/AchievementRepository");
const {conquista} = models;

module.exports.run = async (client, msg, params) => {
    if (msg.attachments.size > 0) {
        const file = msg.attachments.get(msg.attachments.lastKey());
        const doc = await registrarConquistas(file, msg)
        msg.channel.send(doc);
    } else {
        const doc = await registrarConquista(params, msg);

        msg.channel.send(doc);
    }
};

async function registrarConquista(params, msg) {
    const paramValido = validarParametros(params, 2);

    if (paramValido) return paramValido;

    const [nome, pontuacao] = params;

    try {
        if (await findAchievementByName(nome)) return "Conquista já registrada!";
        await conquista.create({nome, pontuacao});
        await createRoleIfNeeded(msg, nome);
        return "Conquista cadastrada com sucesso!";
    } catch (error) {
        return `ocorreu um erro liga no devops ${error.message}`;
    }
}

async function createRoleIfNeeded(msg, achievementName) {
    const guild = msg.channel.guild;
    const role = guild.roles.cache.find(r => r.name === achievementName);

    if (role) return;

    try {
        await guild.roles.create({
            data: {
                name: achievementName,
            },
        })
    } catch (error) {
        msg.channel.send(`erro ao criar cargo ${achievementName} crie manualmente`);
        telegramLogger(`createRoleIfNeeded(${JSON.stringify(msg)}, ${achievementName}) - error message: ${error.message}`);
        telegramLogger(JSON.stringify(error))
    }
}

async function registrarConquistas(file, msg) {
    const {url} = file;

    const conquistas = await serializarCSV(url);

    if (typeof conquistas === 'string') return conquistas;

    const bulkInsert = await Promise.all(conquistas.map(async conquista => {

        await createRoleIfNeeded(msg, conquista.nome);
        return {
            nome: conquista.nome,
            pontuacao: conquista.pontuacao
        }
    }))

    try {
        await conquista.bulkCreate(bulkInsert);
        return "Conquistas cadastradas com sucesso";
    } catch (error) {
        return `ocorreu um erro liga no devops ${error.message}`;
    }
}

async function serializarCSV(url) {
    if (!url.includes('.csv')) return "Cadastrar conquistas em massa só aceita .csv com cabeçalho nome e pontuacao";

    try {
        const path = await baixarArquivoCSV(url);
        return getJsonFromCSVFile(path);
    } catch (error) {
        return `ocorreu um erro liga no devops ${error.message}`;
    }
}