const {token} = require('../config.json');
const sequelize = require('./Database');
const {Client, Intents} = require('discord.js');
const {adminMiddleware} = require('./middleware/admin.middleware');

const client = new Client({
    intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

client.once('ready', async () => {
    await assertDatabaseConnectionOk();
    console.log('Ready!');
});

client.on("message", async msg => {

    const {command, paramsTratados} = tratarMensagem(msg);

    if (!command) return;

    try {
        const commandFile = require(`./commands/message/${command}.js`);
        const runCmd = () => commandFile.run(client, msg, paramsTratados);
        adminMiddleware(command, msg, runCmd);
    } catch (err) {
        msg.channel.send("Ta tentando falar comigo? Manda um .a help que eu te ajudo");
        console.error(`(${command}) Error: ${err}`);
        console.error(err)
    }
})

client.on('messageReactionAdd', async (reaction, user) => {
    const msg = reaction.message;
    const guild = msg.guild;
    const guildMembers = guild.members.cache;
    const guildMember = guildMembers.get(user.id)
    // Now the message has been cached and is fully available
    console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
    // The reaction is now also fully available and the properties will be reflected accurately:
    console.log({user});
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

