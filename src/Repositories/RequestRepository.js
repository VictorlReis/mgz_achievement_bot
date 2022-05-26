const {models} = require('../Database');
const {requisicao, conquista} = models;

async function createRequest(request) {
    return requisicao.create(request)
}

async function deleteRequestByMsgId(msgId) {
    return requisicao.destroy({
        where: {
            idMensagem: msgId
        }
    })
}

async function findRequestByMsgId(msgId) {
    return requisicao.findOne({
        where: {
            idMensagem: msgId
        },
        include: [conquista]
    })
}

module.exports = {
    createRequest,
    deleteRequestByMsgId,
    findRequestByMsgId
}