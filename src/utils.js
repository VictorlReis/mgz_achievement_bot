function validarParametros(params, numeroEsperado) {
    if (!params || params.length !== numeroEsperado) return 'parametros invalidos'
}

function createDiscordTag(author) {
    return author.username + "#" + author.discriminator;
}

function chunk(arr, len) {

    if (len === 0) throw new Error('chunks must have at least one range');

    let chunks = [],
        i = 0,
        n = arr.length;

    while (i < n) {
        chunks.push(arr.slice(i, i += len));
    }

    return chunks;
}

module.exports = {
    validarParametros,
    createDiscordTag,
    chunk
}