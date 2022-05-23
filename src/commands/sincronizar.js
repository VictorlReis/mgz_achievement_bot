const {setConquista} = require("./setConquista")
const {createDiscordTag} = require('../utils')
const {registrarMeguinha} = require("../Repositories/UserRepository");

module.exports.run = async (client, msg, _) => {

    const guild = msg.channel.guild;
    const members = guild.members;

    for (const [_, member] of members.cache) {
        if (member.user.bot) return
        for (const key of member._roles) {
            const role = guild.roles.cache.get(key);
            const discordTag = createDiscordTag(member.user);
            try {
                // await registrarMeguinha(member.user);
                // const output = await setConquista(msg, [discordTag,role.name ]);
                msg.channel.send(JSON.stringify({user: discordTag, role: role.name}));
            } catch (e) {
                console.error(e);
                msg.channel.send(`ocorreu um erro liga no devops ${e.message}`);
            }
        }
    }
};
