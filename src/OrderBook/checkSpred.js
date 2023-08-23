const { temporary5minBlackArr } = require("../Data")
const { chains } = require("./orderBookData")

const checkSpred = (chain) => {
    const closeExchangesToBuyFrom = ['bitmart']
    let flag = 0
    if(chain.stablePrices[100] > 0.9) { // при 100 доларов зароботок больше 0.9
        if((Number(chain.profitInUSDT) < 1.5) || (Number(chain.realPercent) < 0.4) || (Number(chain.maxDealInSellEx) < 150)) {   // если профит меньше 1 долларов c учетом коммисии или спред < 0.4
            chain.blockingTime = new Date() // сохраняем время блокировки
            chain.timeInBlock = 5
            temporary5minBlackArr.data.push(chain) // пушим в 5 минутный блокировочный массив
            flag = 1
        }  
        if(flag === 0) {
            if(!closeExchangesToBuyFrom.includes(chain.buyFrom)) {
                if(chain.symbol !== 'BABYDOGEUSDT') chains.data.push(chain) // ПОТОМ УБРАТЬ ЭТО УСЛОВИЕ
            }
        }
    } else {
        chain.blockingTime = new Date() // сохраняем время блокировки
        chain.timeInBlock = 6
        temporary5minBlackArr.data.push(chain) // пушим в 5 минутный блокировочный массив
    }
}

module.exports = { checkSpred }
