const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config()
const telegramToken = process.env.telegramToken
const chatId = process.env.chatId
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