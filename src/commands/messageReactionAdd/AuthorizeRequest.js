const {REACTIONS} = require("../../constants");
const {deleteRequestByMsgId, findRequestByMsgId} = require("../../Repositories/RequestRepository")
const {findUserByDiscordId} = require("../../Repositories/UserRepository");
const {setDiscordRole} = require("../../utils");


module.exports.run = async (client, msg, params) => {
    const {reaction} = params;

    if (reaction === REACTIONS.REJECT) {
        await deleteRequestByMsgId(msg.id);
    }

    if (reaction === REACTIONS.CONFIRM) {
        const request = await findRequestByMsgId(msg.id);
        const user = await findUserByDiscordId(request.discordId);
        await user.addConquista(request.conquista);
        const nomesConquistas = request.conquista.map(a => a.toJSON().nome)
        for (const conquista of nomesConquistas) {
            await setDiscordRole(msg, conquista, request.discordId);
        }
        await deleteRequestByMsgId(msg.id);
    }
    msg.delete()
}