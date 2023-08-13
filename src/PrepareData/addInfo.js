let { changeBinance, changeMexc, changeBybit, changeGateIo, changeCoinbase, changeLBank, changeKuCoin, changeOKX, changeBitget, changeHuobi, changePoloniex } = require('./differentExchanges')
let { mexcBlackList, binanceBlackList, bybitBlackList, gateIoBlackList, lbankBlackList, kucoinBlackList, kucoinArr, huobiBlackList, bitgetBlackList, poloniexBlackList } = require('./ExchangesArray')
const axios = require("axios")
let kuCoinFlag = 0
const addInfo = async(coins, num) => {
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
            const check = check3L(coins[i].symbol)
            if(check) {
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
            const check = check3L(coins[i].symbol)
            if(check) {
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
            const check = check3L(coins[i].symbol)
            if(check) {
                coins.splice(i, 1)
                i--
                continue
            }
        }
        const sortedArray = coins.sort((a,b) => (a.symbol > b.symbol) ? 1 : ((b.symbol > a.symbol) ? -1 : 0))
        changeGateIo(sortedArray)
    }
    if(num == 4) {   //coinbase
        // for(let i=0; i<coins.length; i++) {
        //     const symbolArr = coins[i].product_id.split('-')
        //     if(symbolArr[1] === 'USDC') {
        //         coins[i].symbol = symbolArr[0]+'USDT'
        //     } else {
        //         coins[i].symbol = symbolArr[0]+symbolArr[1]
        //     }
        //     coins[i].askPrice = coins[i].asks[0].price
        //     coins[i].askQty = coins[i].asks[0].size
        //     coins[i].bidPrice = coins[i].bids[0].price
        //     coins[i].bidQty = coins[i].bids[0].size
        // }
        // const sortedArray = coins.sort((a,b) => (a.symbol > b.symbol) ? 1 : ((b.symbol > a.symbol) ? -1 : 0))
        // changeCoinbase(sortedArray)
    }
    if(num == 5) {   //LBank
        coins = coins.data
        for(let i=0; i<coins.length; i++) {
            coins[i].symbol = coins[i].symbol.replace(/_/g, "").toUpperCase()
            coins[i].askPrice = coins[i].price
            coins[i].bidPrice = coins[i].price
            if(lbankBlackList.includes(coins[i].symbol)) {
                coins.splice(i, 1)
                i--
                continue
            }
            const check = check3L(coins[i].symbol)
            if(check) {
                coins.splice(i, 1)
                i--
                continue
            }
        }  
        changeLBank(coins)
    }
    if(num == 6) {   //KuCoin
        coins = coins.data.ticker
        for(let i=0; i<coins.length; i++) {
            coins[i].symbol = coins[i].symbol.replace(/-/g, "")
            coins[i].askPrice = coins[i].sell
            coins[i].bidPrice = coins[i].buy
            if(kucoinBlackList.includes(coins[i].symbol)) {
                coins.splice(i, 1)
                i--
                continue
            }
            if(kucoinArr.data.length) {
                const exiedCoin = kucoinArr.data.find((item) => item.symbol === coins[i].symbol)
                if(!exiedCoin) {
                    coins.splice(i, 1)
                    i--
                }
            }
        }  
        const sortedArray = coins.sort((a,b) => (a.symbol > b.symbol) ? 1 : ((b.symbol > a.symbol) ? -1 : 0))
        changeKuCoin(sortedArray)
    }
    if(num == 7) {   //OKX
        coins = coins.data
        for(let i=0; i<coins.length; i++) {
            coins[i].symbol = coins[i].instId.replace(/-/g, "")
            coins[i].askPrice = coins[i].askPx
            coins[i].bidPrice = coins[i].bidPx
        }  
        changeOKX(coins)
    }
    if(num == 8) {   //Bitget
        coins = coins.data
        for(let i=0; i<coins.length; i++) {
            coins[i].askPrice = coins[i].sellOne
            coins[i].bidPrice = coins[i].buyOne
            if(bitgetBlackList.includes(coins[i].symbol)) {
                coins.splice(i, 1)
                i--
            }
        }  
        changeBitget(coins)
    }
    if(num == 9) {   //Huobi
        coins = coins.data
        for(let i=0; i<coins.length; i++) {
            coins[i].symbol = coins[i].symbol.toUpperCase()
            coins[i].askPrice = coins[i].ask
            coins[i].bidPrice = coins[i].bid
            if(huobiBlackList.includes(coins[i].symbol)) {
                coins.splice(i, 1)
                i--
            }
        }  
        changeHuobi(coins)
    }
    if(num == 10) {   //Poloniex
        for(let i=0; i<coins.length; i++) {
            coins[i].symbol = coins[i].symbol.replace(/_/g, "")
            coins[i].askPrice = coins[i].ask
            coins[i].bidPrice = coins[i].bid
            if(poloniexBlackList.includes(coins[i].symbol)) {
                coins.splice(i, 1)
                i--
            }
        }  
        changePoloniex(coins)
    }
}


function check3L(symbol) {
    if (symbol.indexOf('3L') > -1) {
        return true
    }
    if (symbol.indexOf('3S') > -1) {
        return true
    }
    if (symbol.indexOf('5L') > -1) {
        return true
    }
    if (symbol.indexOf('5S') > -1) {
        return true
    }
    return false
} 

module.exports = { addInfo }