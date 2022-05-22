const {registrarMeguinha} = require("../Repositories/UserRepository");

module.exports.run = async (client, msg, params) => {

    const doc = await registrarMeguinha(msg.author, params);
    msg.channel.send(doc);
};


