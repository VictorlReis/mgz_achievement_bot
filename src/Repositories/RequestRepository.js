const {models} = require('../Database');
const {requisicao} = models;

async function createRequest(request) {
    return requisicao.create(request)
}

module.exports = {
    createRequest
}