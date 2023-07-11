let { currentMilkyArr } = require('../Data')
let { accumulate } = require('./accumulate')
const { format } = require('date-fns')

const findSpred = (allCoins, mainData) => {
    for(let i=0; i<mainData.length; i++) {                // mainData = [{ coinName: 'ETHBTC', indexesInAllCoins: [ 0, 3360 ] }, ...]
        let indexesArr = mainData[i].indexesInAllCoins    // [ 0, 3360 ] -->
        for(let j=0; j<indexesArr.length; j++) {                 
            let askPrice = Number(allCoins[indexesArr[j]].askPrice)
            let bidPrice = Number(allCoins[indexesArr[j]].bidPrice)

            for(let n=j+1; n<indexesArr.length; n++) {                 
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
    console.log(currentMilkyArr)
    console.log('--------------')
    accumulate()
}

const checkPercent = (spred, coinBuy, coinSell) => {
    if(spred > 0.2) {
        const dateTime = format(new Date(), 'HH:mm:ss')
        const symbol = coinBuy.symbol
        const buyFrom = coinBuy.exchangeName
        const sellTo = coinSell.exchangeName

        let hedging = false
        if(coinSell.isolated || coinSell.cross) {
            hedging = true
        }

        const obj = {
            symbol: symbol,
            buyFrom: buyFrom,
            sellTo: sellTo,
            nickName: `${symbol}_${buyFrom}_${sellTo}`,
            spred: Number(spred.toFixed(3)),
            hedging, 
            time: dateTime,
            count: 1
        }
        currentMilkyArr.push(obj)
    }
}


module.exports = { findSpred }