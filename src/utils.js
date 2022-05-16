
function validarParametros(params, numeroEsperado) {
    if (!params || params.length !== numeroEsperado) return 'parametros invalidos'
}


module.exports = {
    validarParametros,
}