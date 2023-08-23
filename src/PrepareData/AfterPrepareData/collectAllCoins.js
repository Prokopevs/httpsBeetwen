let { createMainArr } = require('./createMainArr')
const { findSpred } = require('../../CompareData/findSpred')
let { flag, binanceArr, mexcArr, bybitArr, gateIoArr, coinbaseArr, lbankArr, kucoinArr, okxArr, bitgetArr, huobiArr, poloniexArr, bitmartArr,uniswapArr } = require('../ExchangesArray')
let { allCoins, mainData } = require('../../Data')

// склеивает allCoins и создаёт mainData
const collectAllCoins = () => {
    if (flag.value === 1) {
        console.log('--------------')
        console.log(allCoins.data.length)
        console.log(bitmartArr.data.length)
        console.log('--------------')
    }
    allCoins.data = [...binanceArr.data, ...mexcArr.data, ...bybitArr.data, ...gateIoArr.data, ...coinbaseArr.data, ...lbankArr.data, ...kucoinArr.data, ...okxArr.data, ...bitgetArr.data, ...huobiArr.data, ...poloniexArr.data, ...bitmartArr.data]
    if (flag.value === 1) {
        console.log('--------------')
        console.log(allCoins.data.length)
        console.log('--------------')
        mainData.data = []
        createMainArr(allCoins.data)
        console.log("по новому создаю mainData")
        console.log("ловись связка большая и маленькая")
        flag.value = 0
    }
    
    findSpred(allCoins.data, mainData.data)
}


module.exports = { collectAllCoins }