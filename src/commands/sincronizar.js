module.exports.run = async (client, msg, _) => {

    const guild = msg.channel.guild;
    const members = guild.members;

    for (const [_,member] of members.cache) {
        if(member.user.bot) return
        for (const key of member._roles) {
            const role = guild.roles.cache.get(key);
            console.log(role);
        //TODO  call setConquista
        }
    }


    // msg.channel.send('');
};
