
function validarParametros(params, numeroEsperado) {
    if (!params || params.length !== numeroEsperado) return 'parametros invalidos'
}

function createDiscordTag(author) {
    return author.username + "#" + author.discriminator;
}

module.exports = {
    validarParametros,
    createDiscordTag
}