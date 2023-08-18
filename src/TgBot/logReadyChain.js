const { telegramBlaskList } = require("../Data")
const { chatId } = require("./botData")
const bot = require('./bot')
const { createStrForTG } = require("./createStrForTG")
const { chains } = require("../OrderBook/orderBookData")

const users = [
    { id: 518918480},
    { id: 611886556},
]

const logReadyChain = () => {
    if(chains.data.length) {
        let count = 0
        for(let i=0; i<chains.data.length; i++) {
            const chain = chains.data[i]
            if(count == 1) { // если залогировали 1 связку, то прекращаем работу
                break
            }
            console.log(chain)
            const MessageStr = createStrForTG(chain)
            for (let i=0; i<users.length; i++) {
                const user = users[i];
                bot.telegram.sendMessage(user.id, MessageStr, 
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
            }
            telegramBlaskList.data.push(chain.fullNickName)

            chains.data.splice(i, 1)  // удалем залогированную связку
            i--
            count++
        } 
    }
}

bot.launch()
module.exports = { logReadyChain }
