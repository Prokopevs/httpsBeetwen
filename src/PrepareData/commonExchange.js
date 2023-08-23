let { flag, bitmartArr } = require('./ExchangesArray')
const { fetchExchangeInfo } = require('./ExtraFetch/fetchExchangeInfo')

const commonExchange = async (coins, oldCoinsArr, exchangeName, exchangeInfo, margin) => {
    const oldArrLength = oldCoinsArr.data.length
    let localFlag = 0
    if(oldArrLength !== coins.length) { // если длина массива старого и нового разная, то пременную flag.value делаем 1
        flag.value = 1
        localFlag = 1
        console.log(`${exchangeName} пришла разная длина` + " " + oldArrLength + " " + coins.length)

        if(oldArrLength !== 0) {   // если разная длина(возможно листинг монеты) то делаем запрос на ExchangeInfo      
            console.log(`Пошёл запрошивать exchangeInfo для биржы ${exchangeName}`)
            exchangeInfo = await fetchExchangeInfo(exchangeName)
        }
    }

    for(let i=0; i<coins.length; i++) {
        if(localFlag === 0) {
            if(coins[i].symbol === oldCoinsArr.data[i]?.symbol) {  // если нашли монеты одинаковые, то меняем цены
                oldCoinsArr.data[i].askPrice = coins[i].askPrice
                oldCoinsArr.data[i].bidPrice = coins[i].bidPrice
            } else {
                flag.value = 1
                localFlag = 1
                console.log(`${exchangeName} символы не равны:` + coins[i].symbol + ' ≠ ' + oldCoinsArr.data[i]?.symbol)
            }
        } else { // сюда попадем если флаг равен 1. Добавим объектам в массиве coins свойство exchangeName, baseAsset, quoteAsset
            for(let j=0; j<coins.length; j++) {
                // margin
                let coinMargin
                if(margin.length) {
                    coinMargin = margin.find((elem) => elem.symbol === coins[j].symbol)
                    if(coinMargin !== undefined) {
                        coins[j].isolated = coinMargin.isolated
                        coins[j].cross = coinMargin.cross
                    } else {
                        coins[j].isolated = false
                        coins[j].cross = false
                    }
                } else {
                    coins[j].isolated = false
                    coins[j].cross = false
                }

                // exchangeInfo
                let coinInfo
                if(exchangeName === 'coinbase'){
                    coinInfo = exchangeInfo.find((elem) => elem.originalSymbol === coins[j].product_id)
                } else {
                    coinInfo = exchangeInfo.find((elem) => elem.symbol === coins[j].symbol)
                }
                if(coinInfo !== undefined) {
                    coins[j].exchangeName = exchangeName
                    coins[j].baseAsset = coinInfo.baseAsset
                    coins[j].quoteAsset = coinInfo.quoteAsset
                    coins[j].name = coinInfo.name
                    if(exchangeName === 'coinbase') coins[j].originalSymbol = coinInfo.originalSymbol
                } else {
                    console.log(`не смог найти ${coins[j].symbol} в exchangeInfo в бирже ${exchangeName}`)
                    throw error
                }
            }
            break
        }
    }
    
    if(localFlag === 1) {
        oldCoinsArr.data = [...coins]

        if(exchangeName === 'bitmart') {
            console.log('oldCoinsArr.data.length= ' + oldCoinsArr.data.length)
            console.log('bitmartArr.data.length= ' + bitmartArr.data.length)
        }
    }
    // console.log(oldCoinsArr.data)
}

module.exports = { commonExchange }