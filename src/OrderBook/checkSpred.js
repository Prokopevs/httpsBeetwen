const { temporary5minBlackArr } = require("../Data")
const { chains } = require("./orderBookData")

const checkSpred = (chain) => {
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
            chains.data.push(chain)
        }
    } else {
        chain.blockingTime = new Date() // сохраняем время блокировки
        chain.timeInBlock = 6
        temporary5minBlackArr.data.push(chain) // пушим в 5 минутный блокировочный массив
    }
}

module.exports = { checkSpred }