const {validarParametros} = require('../utils')
const {baixarArquivoCSV, getJsonFromCSVFile} = require("../Repositories/FileRepository");
const {models} = require('../Database');
const {findAchievementByName} = require("../Repositories/AchievementRepository");
const {conquista} = models;

module.exports.run = async (client, msg, params) => {
    if (msg.attachments.size > 0) {
        const file = msg.attachments.get(msg.attachments.lastKey());
        const doc = await registrarConquistas(file)
        msg.channel.send(doc);
    } else {
        const doc = await registrarConquista(params);

        msg.channel.send(doc);
    }
};

async function registrarConquista(params) {
    const paramValido = validarParametros(params, 2);

    if (paramValido) return paramValido;

    const [nome, pontuacao] = params;

    try {
        if (await findAchievementByName(nome)) return "Conquista já registrada!";
        await conquista.create({nome, pontuacao});
        return "Conquista cadastrada com sucesso!";
    } catch (error) {
        return `ocorreu um erro liga no devops ${error.message}`;
    }
}

async function registrarConquistas(file) {
    const {url} = file;

    const conquistas = await serializarCSV(url);

    if (typeof conquistas === 'string') return conquistas;

    const bulkInsert = conquistas.map(conquista => ({nome: conquista.nome, pontuacao: conquista.pontuacao}))

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