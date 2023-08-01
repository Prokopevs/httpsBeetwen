const { temporary5minBlackArr } = require("../Data")

const logReadyChain = (chain) => {
    const sumObjLength = Object.keys(chain.stablePrices).length
    let flag = 0
    if(sumObjLength === 0) { // если длина объекта stablePrices равна нулю
        if((chain.profitInUSDT < 0.2) || (chain.realPercent < 0.2)) {   // если профит меньше 0.2 долларов c учетом коммисии или спред < 0.2
            chain.blockingTime = new Date() // сохраняем время блокировки
            chain.timeInBlock = 5
            temporary5minBlackArr.data.push(chain) // пушим в 5 минутный блокировочный массив
            flag = 1
        } else {  // проверка на вывод монеты
            if((Object.keys(chain.withdrawInfo).length == 0)) {
                if(chain.buyFrom !== 'coinbase' && chain.sellTo!== 'coinbase') { //не баним coinbase т.к не знаем о выводе
                    chain.blockingTime = new Date() // сохраняем время блокировки
                    chain.timeInBlock = 20
                    temporary5minBlackArr.data.push(chain) // пушим в 5 минутный блокировочный массив
                    flag = 1
                }
            }
        }
    } else {  // проверка на вывод монеты
        if((Object.keys(chain.withdrawInfo).length == 0)) {
            if(chain.buyFrom !== 'coinbase' && chain.sellTo!== 'coinbase') { //не баним coinbase т.к не знаем о выводе
                chain.blockingTime = new Date() // сохраняем время блокировки
                chain.timeInBlock = 20
                temporary5minBlackArr.data.push(chain) // пушим в 5 минутный блокировочный массив
                flag = 1
            }
        }
    }


    if(flag === 0) {
        console.log(chain)
    }
}

module.exports = { logReadyChain }
