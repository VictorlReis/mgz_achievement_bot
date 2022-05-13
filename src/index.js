const Discord = require('discord.js');
const mongoose = require('mongoose');
const { clientId, guildId, token, connectionString } = require('../config.json');
const Meguinha = require('./models/meguinha');
const Conquista = require('./models/conquista');

const client = new Discord.Client({ intents: [ 'DIRECT_MESSAGES', 'GUILD_MESSAGES' ] });

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
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;

    const mensagem = msg.toString();

    if(!mensagem) return;

    const [a, cmd, ...params] = mensagem.split(" ");

    if(!a.includes('.a')) return;

    const paramsTratados = tratarParams(params);
    
    switch (cmd) {
        case "help":
            await msg.channel.send(doc);
          return;
        case 'registrar':
            await msg.channel.send(await registrarMeguinha(paramsTratados));
            return;
        case 'newConquista':
            await msg.channel.send("ainda n ta pronto");
            return;
        case 'leaderboard':
            await msg.channel.send("ainda n ta pronto");
            return;   
        case 'setConquista':
            await registrarMeguinha(paramsTratados);
            await msg.channel.send("ainda n ta pronto");
            return;              
        case 'updateConquista':
            await msg.channel.send(paramsTratados);
            return;  
        default:
            msg.channel.send("Ta tentando falar comigo? Manda um .a help que eu te ajudo");
            return;
    }
})

client.login(token);

async function registrarMeguinha(params) {

    if(!params || params.length !== 1) return;

    if(usuarioJaRegistrado(params[0])) return "Usuário já registrado!";

    Meguinha.create({discordTag: params[0]});
    
    return "Usuário cadastrado com sucesso!";
}

async function usuarioJaRegistrado(discordTag) {
    return await Meguinha.findOne({discordTag});
}

function tratarParams(params) {
    if(!params) return;

    return params
        .join(" ")
        .split("/")
        .map(param => param.trim());
}

const doc = "Lista de comandos: Registrar um usuário: .a registrar {DISCORDTAG} | Adicionar uma conquista .a newConquista {NOMEDACONQUISTA} {PONTUACAO} | Mostrar leaderboard: .a leaderboard" +
"| Atribuir uma conquista pra alguém: .a setConquista {DISCORDTAG}/{NOMEDACONQUISTA} | Remover uma conquista de alguém: .a removeConquista {DISCORDTAG} {NOMEDACONQUISTA}" + 
"| Atualizar pontuação da conquista: .a updateConquita {NOMEDACONQUISTA}/{PONTUACAO}";
