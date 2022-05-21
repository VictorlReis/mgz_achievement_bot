const mongoose = require('mongoose');
const {ConquistaSchema} = require('./conquista');

const meguinha = new mongoose.Schema({
    discordTag: { type: String },
    discordId: {type: String },
    conquistas: [ConquistaSchema]
})

module.exports = Meguinha = mongoose.model("meguinha", meguinha);
