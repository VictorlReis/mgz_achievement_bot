const Discord = require("discord.js");
const { validarConquista, validarUsuario, validarParametros } = require('../utils')


module.exports.run = async (client, msg, params) => {
    const output = await setConquista(params);

    msg.channel.send(output);
};


async function setConquista(params) {
    const paramValido = validarParametros(params, 2);
    if (paramValido) return paramValido;

    const [discordTag, conquista, ...xs] = params;

    if (!validarConquista(conquista) || !validarUsuario(discordTag)) return `conquista ou usuário invalidos`;

    Meguinha.findOneAndUpdate({ discordTag }, { $push: { conquistas: conquista } })
    return `@discordTag agora tem a conquista ${conquista} parabéns!!!`
}