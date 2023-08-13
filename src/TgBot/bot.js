require('dotenv').config({path:__dirname+'/../.env'})
const { Telegraf } = require('telegraf');
const { format } = require('date-fns')
const fetchOrderBookMain = require('../OrderBook/fetchOrderBook.js');
const { createStrForTG } = require('../OrderBook/createStrForTG.js');
const { chatId } = require('./botData.js');
const botToken = process.env.bot
const bot = new Telegraf(botToken);

bot.on('callback_query', async (ctx) => {
    const dataArr = ctx.update.callback_query.message.text.split('\n')

    const parts = dataArr[0].split('/')[1].split('[')[1].split(']')[0].split('|')
    const names = parts.map(part => part.trim()) // ['babydogecoin', 'babydogecoin']

    const nickName = ctx.update.callback_query.data
    const callback_dataArr = nickName.split('_') // [XETAUSDT, gateIo, bitget, f]
    const hedging = callback_dataArr[3] === 't' ? true : false

    let baseAsset = dataArr[0].split('/')[0].slice(2)
    if(baseAsset[0] === ' ') baseAsset = baseAsset.slice(1)
    const quoteAsset = dataArr[0].split('/')[1].split(' ')[0]

    const dateTime = format(new Date(), 'HH:mm:ss')

    const finalObj = {
        symbol: callback_dataArr[0],
        baseAsset: baseAsset,
        quoteAsset: quoteAsset,
        buyFrom: callback_dataArr[1],
        sellTo: callback_dataArr[2],
        hedging: hedging,
        nickName: nickName.slice(0, -2),
        names: names,
        time: dateTime,
    } 

    const chain = await fetchOrderBookMain.fetchOrderBook([finalObj], 'refetch')
    const NewMessageStr = createStrForTG(chain)
    const messageId = ctx.update.callback_query.message.message_id

    bot.telegram.editMessageText(chatId, messageId, null, NewMessageStr, {
        reply_markup: {
            inline_keyboard:
            [
                [
                    {text: 'обновить', callback_data: nickName}
                ]
            ]
        },
        parse_mode: 'Markdown'
        })
    ctx.answerCbQuery()
})

// bot.start((ctx) => {
//     ctx.reply('you are in')
//     console.log(ctx.update.message)
// })

// на сообщение /test, /Test вернет hello
// bot.command(['test', 'Test'], (ctx) => {
//     ctx.reply('hello')
// })

// на сообщение cat вернет may
// bot.hears('cat', (ctx) => {
//     ctx.reply('may')
// })

// на любое сообщение вернет 'this is a text message'
// bot.on('text', (ctx) => {
//      ctx.reply('this is a text message')
// })

// на сообщение @botF вернет 'mention method'
// bot.mention('botF', (ctx) => {
//     ctx.reply('mention method')
// })

// на сообщение #hash вернет 'mention method'
// bot.hashtag('hash', (ctx) => {
//     ctx.reply('hashtag method')
// })

// на любое сообщение, любой смайлик вернет 'use' //17 видео про next
// bot.use((ctx) => {
//     ctx.reply('use')
// })

//на /start отвечаем 2 способами
// bot.command('start', ctx => {
//     console.log(ctx.update.message)
//     ctx.reply('hello')
//     bot.telegram.sendMessage(ctx.chat.id, 'hello there')
// })

// bot.command('start', ctx => {
//     bot.telegram.sendMessage(ctx.chat.id, 'hello there', 
//     {
//         reply_markup: {
//             inline_keyboard:[
//                 [
//                     {text: 'click me', callback_data: 'one'}
//                 ]
//             ]
//      }
//     })
// })

// bot.on('callback_query', (ctx) => {
//     console.log(ctx.update.callback_query)
//     const data = ctx.callbackQuery.data;
  
//     if (data === 'one') {
//       ctx.reply('Нажата кнопка 1');
//     }
//   });

// bot.telegram.sendMessage(chatId, 'here', 
//     {
//     reply_markup: {
//         inline_keyboard:
//         [
//             [
//                 {text: 'обновить', callback_data: 'f'}
//             ]
//         ]
//     },
//     parse_mode: 'Markdown'
//     })

// отправить сообщение
// bot.telegram.sendMessage(518918480, 'here\nhhello')
// for(let i=0; i<usersId.length; i++) {
//     bot.telegram.sendMessage(usersId[i], 'here')
// }
module.exports = bot


// bot.launch()
