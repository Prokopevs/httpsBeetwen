let { binanceArr, mexcArr, bybitArr, gateIoArr } = require('./ExchangesArray')
let { commonExchange } = require('./commonExchange')
let { binanceExchangeInfo, mexcExchangeInfo, bybitExchangeInfo, gateIoExchangeInfo } = require('../ExtraInfo/ExchangeData')
let { binanceMargin, gateIoMargin, bybitMargin } = require('.././Margin/marginData')


const changeBinance = (coins) => {
    commonExchange(coins, binanceArr, 'binance', binanceExchangeInfo.exchangeData, binanceMargin.marginData)
}

const changeMexc = (coins) => {
    commonExchange(coins, mexcArr, 'mexc', mexcExchangeInfo.exchangeData, [])
}

const changeBybit = (coins) => {
    commonExchange(coins, bybitArr, 'bybit', bybitExchangeInfo.exchangeData, bybitMargin.marginData)
}

const changeGateIo = (coins) => {
    commonExchange(coins, gateIoArr, 'gateIo', gateIoExchangeInfo.exchangeData, gateIoMargin.marginData)
}

module.exports = { changeBinance, changeMexc, changeBybit, changeGateIo}