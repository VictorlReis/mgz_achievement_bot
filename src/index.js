const Discord = require('discord.js');
const mongoose = require('mongoose');
const { token, connectionString } = require('../config.json');

const client = new Discord.Client({ intents: ['DIRECT_MESSAGES', 'GUILD_MESSAGES'] });

client.once('ready', () => {
    console.log('Ready!');
    mongoose.connect(connectionString)
        .then(() => {
            console.log('Conectou no banco!');
        })
        .catch(error => console.log(error));
});

client.on("message", async msg => {
    
    const { command, params } = tratarMensagem();

    try {
        const commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, msg, params);
    } catch (err) {
        msg.channel.send("Ta tentando falar comigo? Manda um .a help que eu te ajudo");
        console.log(`(${command}) Error: ${err}`);
    }
})

function tratarMensagem(msg) {
    if (msg.author.bot) return null;
    if (msg.channel.type === "dm") return null;

    const mensagem = msg.toString();
    if(!mensagem) return null;

    const [a, command, ...params] = mensagem.split(" ");
    if (!a.includes('.a')) return null;

    const paramsTratados = tratarParams(params);

    return { command, paramsTratados };    
    
}

client.login(token);

function tratarParams(params) {
    if (!params) return;

    return params
        .join(" ")
        .split("/")
        .map(param => param.trim());
}

