const mongoose = require('mongoose');

const ConquistaSchema = new mongoose.Schema({
    nome: {type: String},
    pontuacao : {type: Number}
})

Conquista = mongoose.model('conquista', ConquistaSchema);

module.exports = {
    Conquista,
    ConquistaSchema
}