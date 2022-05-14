const Meguinha = require('./models/meguinha');
const Conquista = require('./models/conquista');

async function usuarioJaRegistrado(discordTag) {
    return await Meguinha.findOne({ discordTag });
}

async function conquistaJaRegistrado(nome) {
    return await Conquista.findOne({ nome });
}

async function validarUsuario(discordTag) {
    if (!discordTag) return;

    return usuarioJaRegistrado(discordTag);
}

async function validarConquista(nome) {
    if (!nome) return;

    return conquistaJaRegistrado(nome);
}

function validarParametros(params, numeroEsperado) {
    if (!params || params.length !== numeroEsperado) return 'parametros invalidos'
}

module.exports = {
    usuarioJaRegistrado,
    conquistaJaRegistrado,
    validarUsuario,
    validarConquista,
    validarParametros
}