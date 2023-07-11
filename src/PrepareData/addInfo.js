let { changeBinance, changeMexc } = require('./differentExchanges')
let { mexcBlackList, binanceBlackList } = require('./ExchangesArray')

const addInfo = (coins, num) => {
    if(num == 0) {
        for(let i=0; i<coins.length; i++) {
            if(coins[i].askPrice == 0) {
                coins.splice(i, 1)
                i--
            } 
            if(binanceBlackList.includes(coins[i].symbol)) {
                coins.splice(i, 1)
                i--
            }
        }
        changeBinance(coins)
    }
    if(num == 1) {
        let filteredCoins = coins.filter((elem) => !mexcBlackList.includes(elem.symbol))
        changeMexc(filteredCoins)
    }
}

module.exports = { addInfo }