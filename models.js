const mongoose = require('mongoose');

const Conquista = mongoose.model('Conquista', {
    nome: String,
    pontuacao: Number
});

const Meguinha = mongoose.model('Meguinha', {
    discordTag: String,
    conquistas: []
});


module.exports = Conquista, Meguinha;

// {
//     id:,
//     discord_user:
//     conquistas: []
// }
