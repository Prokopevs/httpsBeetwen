let { changeBinance, changeMexc, changeBybit, changeGateIo } = require('./differentExchanges')
let { mexcBlackList, binanceBlackList, bybitBlackList, gateIoBlackList } = require('./ExchangesArray')

const addInfo = (coins, num) => {
    if(num == 0) {  //binance
        for(let i=0; i<coins.length; i++) {
            if(coins[i].askPrice == 0) {
                coins.splice(i, 1)
                i--
                continue
            } 
            if(binanceBlackList.includes(coins[i].symbol)) {
                coins.splice(i, 1)
                i--
                continue
            }
        }
        changeBinance(coins)
    }

    if(num == 1) {   //mexc
        for(let i=0; i<coins.length; i++) {
            if(mexcBlackList.includes(coins[i].symbol)) {
                coins.splice(i, 1)
                i--
                continue
            }
            if (coins[i].symbol.indexOf('3L') > -1) {
                coins.splice(i, 1)
                i--
                continue
            }
            if (coins[i].symbol.indexOf('3S') > -1) {
                coins.splice(i, 1)
                i--
                continue
            }
        }
        changeMexc(coins)
    }

    if(num == 2) {   //bybit
        coins = coins.result.list
        for(let i=0; i<coins.length; i++) {
            coins[i].askPrice = coins[i].ask1Price
            coins[i].askQty = coins[i].ask1Size
            coins[i].bidPrice = coins[i].bid1Price
            coins[i].bidQty = coins[i].bid1Size
            if(bybitBlackList.includes(coins[i].symbol)) {
                coins.splice(i, 1)
                i--
                continue
            }
            if (coins[i].symbol.indexOf('3L') > -1) {
                coins.splice(i, 1)
                i--
                continue
            }
            if (coins[i].symbol.indexOf('3S') > -1) {
                coins.splice(i, 1)
                i--
                continue
            }
        }
        const sortedArray = coins.sort((a,b) => (a.symbol > b.symbol) ? 1 : ((b.symbol > a.symbol) ? -1 : 0))
        changeBybit(sortedArray)
    }

    if(num == 3) {   //gateIo
        for(let i=0; i<coins.length; i++) {
            coins[i].symbol = coins[i].currency_pair.replace(/_/g, "")
            coins[i].askPrice = coins[i].lowest_ask
            coins[i].bidPrice = coins[i].highest_bid
            if(gateIoBlackList.includes(coins[i].symbol)) {
                coins.splice(i, 1)
                i--
                continue
            }
            if (coins[i].symbol.indexOf('3L') > -1) {
                coins.splice(i, 1)
                i--
                continue
            }
            if (coins[i].symbol.indexOf('3S') > -1) {
                coins.splice(i, 1)
                i--
                continue
            }
            if (coins[i].symbol.indexOf('5L') > -1) {
                coins.splice(i, 1)
                i--
                continue
            }
            if (coins[i].symbol.indexOf('5S') > -1) {
                coins.splice(i, 1)
                i--
                continue
            }
        }
        const sortedArray = coins.sort((a,b) => (a.symbol > b.symbol) ? 1 : ((b.symbol > a.symbol) ? -1 : 0))
        changeGateIo(sortedArray)
    }
}

module.exports = { addInfo }