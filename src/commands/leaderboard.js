const {getAllUsers} = require("../Repositories/UserRepository");


module.exports.run = async (client, msg, params) => {
    const users = await getAllUsers();

    msg.channel.send(users);
};