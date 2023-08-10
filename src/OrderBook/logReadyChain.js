const { temporary5minBlackArr } = require("../Data")
const { chatId } = require("../TgBot/botData")
const bot = require('../TgBot/bot')
const { createStrForTG } = require("./createStrForTG")

const logReadyChain = (chain) => {
    const keysArr = Object.keys(chain.stablePrices)
    const workArr = ['50', '75', '100']
    let flag = 0
    if(workArr.includes(keysArr[0])) { // если длина объекта stablePrices не равна нулю
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
                            {text: 'обновить', callback_data: `${JSON.stringify(chain)}`}
                        ]
                    ]
                },
                parse_mode: 'Markdown'
                })
        }
    } 
    // else {  // проверка на вывод монеты
    //     if((Object.keys(chain.withdrawInfo).length == 0)) {
    //         if(chain.buyFrom !== 'coinbase' && chain.sellTo!== 'coinbase') { //не баним coinbase т.к не знаем о выводе
    //             chain.blockingTime = new Date() // сохраняем время блокировки
    //             chain.timeInBlock = 20
    //             temporary5minBlackArr.data.push(chain) // пушим в 5 минутный блокировочный массив
    //             flag = 1
    //         }
    //     }
    // }

    // if(flag === 0) {
    //     console.log(chain)
    // }
}

bot.launch()
module.exports = { logReadyChain }
