const { telegramBlaskList } = require("../Data")
const { chatId } = require("../TgBot/botData")
const bot = require('../TgBot/bot')
const { createStrForTG } = require("./createStrForTG")
const { chains } = require("./orderBookData")

const logReadyChain = () => {
    if(chains.data.length) {
        let count = 0
        for(let i=0; i<chains.data.length; i++) {
            const chain = chains.data[i]
            if(count == 3) { // если залогировали три связки, то прекращаем работу
                break
            }
            console.log(chain)
            const MessageStr = createStrForTG(chain)
            bot.telegram.sendMessage(chatId, MessageStr, 
                {
                reply_markup: {
                    inline_keyboard:
                    [
                        [
                            {text: 'обновить', callback_data: chain.nickName+'_'+String(chain.hedging)[0]}
                        ]
                    ]
                },
                parse_mode: 'Markdown'
                }
            )
            telegramBlaskList.data.push(chain.nickName)

            chains.data.splice(i, 1)  // удалем залогированную связку
            i--
            count++
        } 
    }
}

bot.launch()
module.exports = { logReadyChain }
