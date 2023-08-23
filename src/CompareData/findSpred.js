let { currentMilkyArr, superBlackArr, temporary5minBlackArr, fiatFilter, telegramBlaskList, requestFlag } = require('../Data')
let { accumulate } = require('./accumulate')
const { format } = require('date-fns')
const { checkWithdraw } = require('./checkWithdraw')

const findSpred = (allCoins, mainData) => {
    for(let i=0; i<mainData.length; i++) {                // mainData = [{ coinName: 'ETHBTC', indexesInAllCoins: [ 0, 3360 ] }, ...]
        let indexesArr = mainData[i].indexesInAllCoins    // [ 0, 3360 ] -->
        for(let j=0; j<indexesArr.length; j++) {                 
            let askPrice = Number(allCoins[indexesArr[j]].askPrice)
            let bidPrice = Number(allCoins[indexesArr[j]].bidPrice)

            for(let n=j+1; n<indexesArr.length; n++) { 
                if(!allCoins[indexesArr[n]]) {
                    console.log(indexesArr)
                    console.log(n)
                    console.log(indexesArr[n])
                    console.log(allCoins.length)
                }
                let NextaskPrice = Number(allCoins[indexesArr[n]].askPrice)
                let NextbidPrice = Number(allCoins[indexesArr[n]].bidPrice)     

                let firstSpred = NextbidPrice*100/askPrice - 100         
                if(firstSpred > 0) {                               // в случае если цена из индекса 3360 больше чем из индекса 0
                    checkPercent(firstSpred, allCoins[indexesArr[j]], allCoins[indexesArr[n]])
                } else {
                    let secondSpred = bidPrice*100/NextaskPrice - 100
                    checkPercent(secondSpred, allCoins[indexesArr[n]], allCoins[indexesArr[j]])
                } 
            }
        }
    }
    if(requestFlag.data === true) {
        accumulate()
    }
}

const checkPercent = (spred, coinBuy, coinSell) => {
    let percent = 0.4
    if((coinBuy.exchangeType==='DEX') || (coinSell.exchangeType==='DEX')) {
        console.log('here')
        percent = 1.5
    }

    const buyFrom = coinBuy.exchangeName
    const sellTo = coinSell.exchangeName
    if((spred > percent) && (buyFrom !== sellTo) && (spred < 100)) {
        const dateTime = format(new Date(), 'HH:mm:ss')
        const symbol = coinBuy.symbol
        const nickName = `${symbol}_${buyFrom}_${sellTo}`

        let hedging = false
        if(coinSell.isolated || coinSell.cross) {
            hedging = true
        }

        let nameChecked = false
        if(coinBuy.name !== undefined) {
            if(coinBuy.name === coinSell.name) {
                nameChecked = true
            }
        }
        
        const obj = {
            symbol: symbol,
            baseAsset: coinBuy.baseAsset,
            quoteAsset: coinBuy.quoteAsset,
            buyFrom: buyFrom,
            sellTo: sellTo,
            nickName: nickName,
            spred: Number(spred.toFixed(3)),
            hedging, 
            nameChecked,
            names: [coinBuy.name, coinSell.name],
            time: dateTime,
            count: 1,
            ...(coinBuy.originalSymbol && {buyOriginalSymbol: coinBuy.originalSymbol}),
            ...(coinSell.originalSymbol && {sellOriginalSymbol: coinSell.originalSymbol}),

            ...(coinBuy.originalQuoteAsset && {buyOriginalQuoteAsset: coinBuy.originalQuoteAsset}),
            ...(coinSell.originalQuoteAsset && {sellOriginalQuoteAsset: coinSell.originalQuoteAsset}),

            ...(coinBuy.network && {buyNetwork: coinBuy.network}),
            ...(coinSell.network && {sellNetwork: coinSell.network}),

            ...(coinBuy.id && {buyId: coinBuy.id}),
            ...(coinSell.id && {sellId: coinSell.id}),
        }

        const buyId = obj.buyId === undefined ? '' : '_'+obj.buyId
        const sellId = obj.sellId === undefined ? '' : '_'+obj.sellId
        const newNickName = obj.nickName+buyId+sellId
        obj.fullNickName = newNickName

        if(!superBlackArr.data.includes(obj.fullNickName)) { // убираем связки которые не сходятся по имени и дают 500+ процентов
            if(!temporary5minBlackArr.data.some(item => item.fullNickName === obj.fullNickName)) {
                if(!fiatFilter.includes(obj.quoteAsset)) { // проверка на фиатные связки (eur и.т.д)
                    if(!telegramBlaskList.data.includes(obj.fullNickName)) { // не проверяем залогированные связки
                        checkWithdraw(obj)
                    }
                }
            }
        }
    }
}

module.exports = { findSpred }