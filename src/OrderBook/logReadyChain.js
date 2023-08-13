const { temporary5minBlackArr, telegramBlaskList } = require("../Data")
const { chatId } = require("../TgBot/botData")
const bot = require('../TgBot/bot')
const { createStrForTG } = require("./createStrForTG")
const { chains } = require("./orderBookData")

const logReadyChain = () => {
    if(chains.data.length) {
        let count = 0
        for(let i=0; i<chains.data.length; i++) {
            if(count == 2) { // если залогировали три связки, то прекращаем работу
                break
            }

            const chain = chains.data[i]
            let flag = 0
            if(chain.stablePrices[100] > 0.9) { // при 100 доларов зароботок больше 0.9
                if((Number(chain.profitInUSDT) < 1) || (Number(chain.realPercent) < 0.4)) {   // если профит меньше 0.3 долларов c учетом коммисии или спред < 0.3
                    chain.blockingTime = new Date() // сохраняем время блокировки
                    chain.timeInBlock = 5
                    temporary5minBlackArr.data.push(chain) // пушим в 5 минутный блокировочный массив
                    flag = 1
                }  
                if((Object.keys(chain.withdrawInfo).length == 0)) {
                    if(chain.buyFrom !== 'coinbase' && chain.sellTo!== 'coinbase') { //не баним coinbase т.к не знаем о выводе
                        chain.blockingTime = new Date() // сохраняем время блокировки
                        chain.timeInBlock = 20
                        temporary5minBlackArr.data.push(chain) // пушим в 5 минутный блокировочный массив
                        flag = 1
                    }
                }
                if(flag === 0) {
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
                }
            } else {
                chain.blockingTime = new Date() // сохраняем время блокировки
                chain.timeInBlock = 6
                temporary5minBlackArr.data.push(chain) // пушим в 5 минутный блокировочный массив
            }

            chains.data.splice(i, 1)  // удалем залогированную связку
            i--
            count++
        } 
    }
}

bot.launch()
module.exports = { logReadyChain }
