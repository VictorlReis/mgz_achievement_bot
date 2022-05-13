const Discord = require('discord.js');
const {token} = require('./config.json');

const client = new Discord.Client();

client.once("ready", () => {
    console.log('online');
});

client.on("message", (msg) => {

});

client.login(token);