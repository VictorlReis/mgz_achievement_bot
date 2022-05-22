const {default: axios} = require("axios");
const fs = require("fs");
const csv = require("csvtojson");
const util = require('util');
const stream = require('stream');
const pipeline = util.promisify(stream.pipeline);

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
    baixarArquivoCSV,
    getJsonFromCSVFile
}