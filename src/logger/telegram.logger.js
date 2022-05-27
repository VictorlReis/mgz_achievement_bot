const TelegramBot = require('node-telegram-bot-api');
const {telegramToken, chatId} = require('../../config.json');
const bot = new TelegramBot(telegramToken, {polling: true});

async function log(message) {
    if (!Array.isArray(message)) {
        message = [message]
    }

    for (const msg of message) {
        if (!msg) return;
        try {
            await bot.sendMessage(chatId, msg)

        } catch (err) {
            console.error(err)
        }
    }
}

module.exports.log = log