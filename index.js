const Discord = require('discord.js');
const mongoose = require('mongoose');
const { clientId, guildId, token, connectionString } = require('./config.json');


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
    

    
    switch (msg.toString()) {
        case ".a help":
            await msg.channel.send(doc);
          return;
        case '.a registrar':
            await msg.channel.send(registrarUsuario(msg));
            return;
        case '.a newConquista':
            await msg.channel.send("ainda n ta pronto");
            return;
        case '.a leaderboard':
            await msg.channel.send("ainda n ta pronto");
            return;   
        case '.a setConquista':
            await msg.channel.send("ainda n ta pronto");
            return;              
        case '.a updateConquista':
            await msg.channel.send("ainda n ta pronto");
            return;  
        default:
            msg.channel.send("Ta tentando falar comigo? Manda um .a help que eu te ajudo");
            return;
    }
})

client.login(token);

function registrarUsuario(msg) {
    const mensagem = msg.toString();

    const usuarioJaRegistrado = true; //users.find(msg.author.id);

    if(usuarioJaRegistrado) return "Usuário já registrado!";

    //users.insert({})
    
    return "Usuário cadastrado com sucesso!";
}




const doc = "Lista de comandos: Registrar um usuário: .a registar {DISCORDTAG} | Adicionar uma conquista .a newConquista {NOMEDACONQUISTA} {PONTUACAO} | Mostrar leaderboard: .a leaderboard" +
"| Atribuir uma conquista pra alguém: .a setConquista {NOMEDACONQUISTA} {DISCORDTAG} | Remover uma conquista de alguém: .a removeConquista {DISCORDTAG} {NOMEDACONQUISTA}" + 
"| Atualizar pontuação da conquista: .a updateConquita {NOMEDACONQUISTA} {PONTUACAO}";