const Meguinha = require('./models/meguinha');
const Conquista = require('./models/conquista');
const util = require('util');
const stream = require('stream');
const pipeline = util.promisify(stream.pipeline);
const fs = require('fs');
const axios = require('axios').default;
const csv = require("csvtojson");

async function usuarioJaRegistrado(discordId) {
    return Meguinha.findOne({ discordId });
}

async function conquistaJaRegistrado(nome) {
    return Conquista.findOne({ nome });
}

async function validarUsuario(discordTag) {
    if (!discordTag) return;

    return usuarioJaRegistrado(discordTag);
}

async function validarConquista(nome) {
    if (!nome) return;

    return conquistaJaRegistrado(nome);
}

function validarParametros(params, numeroEsperado) {
    if (!params || params.length !== numeroEsperado) return 'parametros invalidos'
}

async function baixarArquivoCSV(url, path = 'src/assets/temp/temp.csv') {
    const response = await axios.get(url, {
        responseType: 'stream'
    })

    if (response.status !== 200) {
        throw new Error(`unexpected response ${response.statusText}`);
    }

    await pipeline(response.data, fs.createWriteStream(path));

    return path
}

async function getJsonFromCSVFile(path) {
    return csv().fromFile(path);
}

module.exports = {
    usuarioJaRegistrado,
    validarUsuario,
    validarConquista,
    validarParametros,
    baixarArquivoCSV,
    getJsonFromCSVFile
}