const mongoose = require('mongoose');

const meguinha = new mongoose.Schema({
    discordTag: { type: String },
    discordId: {type: String },
    conquistas: { type: Array, default: []}
})

module.exports = Meguinha = mongoose.model("meguinha", meguinha);
