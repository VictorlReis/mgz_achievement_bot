const {token} = require('../config.json');
const sequelize = require('./Database');
const {Client, Intents} = require('discord.js');
const {adminMiddleware} = require('./middleware/admin.middleware');
const {REACTIONS} = require("./constants");
const {getAllRequests} = require('./Repositories/RequestRepository')
const client = new Client({
    intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

client.once('ready', async () => {
    await assertDatabaseConnectionOk();
    console.log('Ready!');
});

async function exec(command, commandType, msg, paramsTratados) {
    try {
        const commandFile = require(`./commands/${commandType}/${command}.js`);
        const runCmd = () => commandFile.run(client, msg, paramsTratados);
        await adminMiddleware(command, msg, runCmd, paramsTratados.discordId)();
    } catch (err) {
        msg.channel.send("Ta tentando falar comigo? Manda um !c help que eu te ajudo");
        console.error(`(${command}) Error: ${err}`);
        console.error(err)
    }
}

client.on("message", async msg => {

    const {command, paramsTratados} = tratarMensagem(msg);

    if (!command) return;
    await exec(command, "message", msg, paramsTratados);
})

client.on('messageReactionAdd', async (reaction, user) => {
    if (user.bot) return;
    if(notValidReaction(reaction._emoji.name)) return;

    const msg = reaction.message;
    const requestsMsgIds = (await getAllRequests()).map(request => request.toJSON().idMensagem);

    if(!requestsMsgIds.includes(msg.id)) return;

    const params = {
        discordId: user.id,
        reaction: reaction._emoji.name
    }
    await exec("AuthorizeRequest", "messageReactionAdd", msg, params);
});

function tratarMensagem(msg) {

    const returnError = {command: undefined};

    if (msg.author.bot) return returnError;
    if (msg.channel.type === "dm") return returnError;

    const mensagem = msg.toString();

    if (!mensagem) return returnError;

    const [a, command, ...params] = mensagem.split(" ");
    if (!a.includes('!c')) return returnError;

    const paramsTratados = tratarParams(params);

    return {command, paramsTratados};
}

client.login(token);

function tratarParams(params) {
    if (!params) return;

    return params
        .join(" ")
        .split("/")
        .map(param => param.trim());
}

function notValidReaction(reaction) {
    for (const reactionKey in REACTIONS) {
        if (reactionKey === reaction) {
            return false;
        }
    }
    return true;
}

async function assertDatabaseConnectionOk() {
    console.log(`Checking database connection...`);
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Database connection OK!');
    } catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        process.exit(1);
    }
}
