const { temporary5minBlackArr } = require("../Data")
const bot = require('./bot')

const logReadyChain = (chain) => {
    const sumObjLength = Object.keys(chain.stablePrices).length
    let flag = 0
    if(sumObjLength !== 0) { // если длина объекта stablePrices равна нулю
        if((Number(chain.profitInUSDT) < 0.5) || (Number(chain.realPercent) < 0.4)) {   // если профит меньше 0.3 долларов c учетом коммисии или спред < 0.3
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

            bot.command('send', (ctx) => {
                if (true) {
                    bot.telegram.sendMessage(targetUserId, 'Привет, только для тебя!');
                }
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
