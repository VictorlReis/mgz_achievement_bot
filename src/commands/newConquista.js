const Conquista = require('../models/conquista');
const { validarConquista, validarParametros } = require('../utils')
const {baixarArquivoCSV, getJsonFromCSVFile} = require("../Repositories/FileRepository");


module.exports.run = async (client, msg, params) => {
    if (msg.attachments) {
        const file = msg.attachments.get(msg.attachments.lastKey());
        const doc = await registrarConquistas(file)
        msg.channel.send(doc);
    } else {
        const doc = registrarConquista(params);

        msg.channel.send(doc);
    }
};

async function registrarConquista(params) {
    const paramValido = validarParametros(params, 2);

    if (paramValido) return paramValido;

    const [nome, pontuacao] = params;

    if (await validarConquista(nome)) return "Conquista já registrada!";

    await Conquista.create({ nome, pontuacao });

    return "Conquista cadastrada com sucesso!";
}

async function registrarConquistas(file) {
    const { url } = file;

    const conquistas = await serializarCSV(url);

    if (typeof conquistas === 'string') return conquistas;

    const bulkInsert = conquistas.map(conquista => ({
        'updateOne': {
            'filter': { 'nome': conquista.nome, 'pontuacao': conquista.pontuacao },
            'update': conquista,
            'upsert': true
        }
    }));

    try {
        await Conquista.bulkWrite(bulkInsert);
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