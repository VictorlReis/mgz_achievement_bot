const Meguinha = require('./models/meguinha');

async function usuarioJaRegistrado(discordTag) {
    return await Meguinha.findOne({ discordTag });
}

module.exports = {
    usuarioJaRegistrado
}