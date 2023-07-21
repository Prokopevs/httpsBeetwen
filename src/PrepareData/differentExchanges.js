let { binanceArr, mexcArr, bybitArr } = require('./ExchangesArray')
let { commonExchange } = require('./commonExchange')
let { binanceExchangeInfo, mexcExchangeInfo, bybitExchangeInfo } = require('../ExtraInfo/ExchangeData')
let { binanceMargin } = require('.././Margin/marginData')


const changeBinance = (coins) => {
    commonExchange(coins, binanceArr, 'binance', binanceExchangeInfo.exchangeData, binanceMargin.marginData)
}

const changeMexc = (coins) => {
    commonExchange(coins, mexcArr, 'mexc', mexcExchangeInfo.exchangeData, [])
}

const changeBybit = (coins) => {
    commonExchange(coins, bybitArr, 'bybit', bybitExchangeInfo.exchangeData, [])
}

module.exports = { changeBinance, changeMexc, changeBybit}