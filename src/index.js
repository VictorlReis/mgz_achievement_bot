const Discord = require('discord.js');
const mongoose = require('mongoose');
const { clientId, guildId, token, connectionString } = require('../config.json');
const Meguinha = require('./models/meguinha');
const Conquista = require('./models/conquista');

const client = new Discord.Client({ intents: ['DIRECT_MESSAGES', 'GUILD_MESSAGES'] });

client.once('ready', () => {
    console.log('Ready!');
    mongoose.connect(connectionString)
        .then(() => {
            console.log('Conectou no banco!');
        })
        .catch(error => console.log(error));
});

//const commands = [".r", ".help"];
//if(!commands.includes(msg.toString())) await msg.channel.send("Ta tentando falar comigo? Manda um .help que eu te ajudo");

client.on("message", async msg => {
    if (msg.author.bot) return;
    if (msg.channel.type === "dm") return;

    const mensagem = msg.toString();

    if (!mensagem) return;

    const [a, command, ...params] = mensagem.split(" ");

    if (!a.includes('.a')) return;

    const paramsTratados = tratarParams(params);

    try {
        const commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, msg, paramsTratados);
    } catch (err) {
        msg.channel.send("Ta tentando falar comigo? Manda um .a help que eu te ajudo");
        console.log(`(${command}) Error: ${err}`);
    }
})

client.login(token);

function tratarParams(params) {
    if (!params) return;

    return params
        .join(" ")
        .split("/")
        .map(param => param.trim());
}

