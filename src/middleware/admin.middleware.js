const adminCommands = new Set([
    "setConquista",
    "newConquista",
    "sincronizar",
    "updateConquista",
    "AuthorizeRequest"
]);

function isAdmin(msg, userId) {
    return msg.member?.permissionsIn(msg.channel).has("ADMINISTRATOR") ||
        msg.channel.guild.members.cache.get(userId).permissionsIn(msg.channel).has("ADMINISTRATOR")
        ;
}

function adminMiddleware(cmd, msg, runCmd, reactionUserId) {
    if(!adminCommands.has(cmd)) return runCmd();

    if(isAdmin(msg, reactionUserId)) return runCmd();

    msg.channel.send("Você precisa ser da DIRETORIA pra usar isso ai mané");
}

module.exports = {
    adminMiddleware
}