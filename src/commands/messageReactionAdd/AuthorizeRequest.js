const {REACTIONS} = require("../../constants");
const {deleteRequestByMsgId, findRequestByMsgId} = require("../../Repositories/RequestRepository")
const {findUserByDiscordId} = require("../../Repositories/UserRepository");
const {setDiscordRole} = require("../../utils");

function notValidReaction(reaction) {
    for (const reactionKey in REACTIONS) {
        if (reactionKey === reaction) {
            return true;
        }
    }
    return false;
}

module.exports.run = async (client, msg, params) => {
    const {discordId, reaction} = params;

    if (notValidReaction(reaction)) {
        return;
    }

    if (reaction === REACTIONS.REJECT) {
        await deleteRequestByMsgId(msg.id);
    }

    if (reaction === REACTIONS.CONFIRM) {
        const request = await findRequestByMsgId(msg.id);
        const user = await findUserByDiscordId(request.discordId);
        await user.addConquista(request.conquista);
        const nomesConquistas = request.conquista.map(a => a.toJSON().nome)
        nomesConquistas.forEach(conquista => setDiscordRole(msg, conquista, discordId))
        await deleteRequestByMsgId(msg.id);
    }
    msg.delete()
}