const adminCommands = new Set([
    "setConquista",
    "newConquista",
    // "sincronizar",
    "updateConquista",
]);

function adminMiddleware(cmd, msg, runCmd) {
    if(!adminCommands.has(cmd)) return runCmd();

    const isAdmin = msg.member.permissionsIn(msg.channel).has("ADMINISTRATOR");

    if(isAdmin) return runCmd();

    msg.channel.send("Você precisa ser da DIRETORIA pra usar isso ai mané");
}

module.exports = {
    adminMiddleware
}