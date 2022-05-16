const Meguinha = require('./models/meguinha');
const Conquista = require('./models/conquista');
const util = require('util');
const stream = require('stream');
const pipeline = util.promisify(stream.pipeline);
const fs = require('fs');
const axios = require('axios').default;
const csv = require("csvtojson");

function validarParametros(params, numeroEsperado) {
    if (!params || params.length !== numeroEsperado) return 'parametros invalidos'
}


module.exports = {
    validarParametros,
}