module.exports.run = async (client, msg, params) => {
    const sentMsg = await msg.channel.send(` requisita x`)
    await sentMsg.react("✅")
    await sentMsg.react("❎")
}