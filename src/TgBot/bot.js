require('dotenv').config({path:__dirname+'/../.env'})
const { Telegraf } = require('telegraf');
const { fetchOrderBook } = require('../OrderBook/fetchOrderBook');
const botToken = process.env.bot
const bot = new Telegraf(botToken);

bot.on('callback_query', (ctx) => {
    const data = ctx.callbackQuery.data;
    // const res = fetchOrderBook([JSON.parse(data)], 'refetch')
    ctx.answerCbQuery()
    // console.log(res)
    console.log(JSON.parse(data))
})

module.exports = bot
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

// отправить сообщение
// bot.telegram.sendMessage(518918480, 'here\nhhello')
// for(let i=0; i<usersId.length; i++) {
//     bot.telegram.sendMessage(usersId[i], 'here')
// }

// bot.launch()
