const mongoose = require('mongoose');

const conquista = new mongoose.Schema({
    nome: {type: String},
    pontuacao : {type: Number}
})

module.exports = Conquista = mongoose.model('conquista', conquista);