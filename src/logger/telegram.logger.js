const TelegramBot = require('node-telegram-bot-api');
const {telegramToken, chatId} = require('../../config.json');
const bot = new TelegramBot(telegramToken, {polling: true});
const stringify = require('json-stable-stringify');

async function log(message) {
    if (typeof message === 'object') {
        message = stringify(message);
    }

    try {
        await bot.sendMessage(chatId, message);
    } catch (err) {
        console.error(err)
    }
}

module.exports.log = log