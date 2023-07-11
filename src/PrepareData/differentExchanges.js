let { binanceArr, mexcArr } = require('./ExchangesArray')
let { commonExchange } = require('./commonExchange')
let { binanceExchangeInfo, mexcExchangeInfo } = require('../ExtraInfo/ExchangeData')
let { binanceMargin } = require('.././Margin/marginData')


const changeBinance = (coins) => {
    commonExchange(coins, binanceArr, 'binance', binanceExchangeInfo.exchangeData, binanceMargin.marginData)
}

const changeMexc = (coins) => {
    commonExchange(coins, mexcArr, 'mexc', mexcExchangeInfo.exchangeData, [])
}

module.exports = { changeBinance, changeMexc, }