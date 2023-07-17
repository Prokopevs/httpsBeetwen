let { flag } = require('./ExchangesArray')
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
                const coinInfo = exchangeInfo.find((elem) => elem.symbol === coins[j].symbol)
                if(coinInfo !== undefined) {
                    coins[j].baseAsset = coinInfo.baseAsset
                    coins[j].quoteAsset = coinInfo.quoteAsset
                    coins[j].name = coinInfo?.name
                } else {
                    console.log(`не смог найти ${coins[j].symbol} в exchangeInfo в бирже ${exchangeName}`)
                }
                coins[j].exchangeName = exchangeName
            }
            console.log(`добавил exchangeName: ${exchangeName} и брейкнул цикл на `+ i +' итерации')
            break
        }
    }
    

    if(localFlag === 1) oldCoinsArr.data = [...coins]
}

module.exports = { commonExchange }