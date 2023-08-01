let { binanceArr, mexcArr, bybitArr, gateIoArr, coinbaseArr, lbankArr, kucoinArr } = require('./ExchangesArray')
let { commonExchange } = require('./commonExchange')
let { binanceExchangeInfo, mexcExchangeInfo, bybitExchangeInfo, gateIoExchangeInfo, coinbaseExchangeInfo, lbankExchangeInfo, kucoinExchangeInfo } = require('../ExtraInfo/ExchangeData')
let { binanceMargin, gateIoMargin, bybitMargin, kucoinMargin } = require('.././Margin/marginData')


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

const changeCoinbase = (coins) => {
    // commonExchange(coins, coinbaseArr, 'coinbase', coinbaseExchangeInfo.exchangeData, [])
}

const changeLBank = (coins) => {
    commonExchange(coins, lbankArr, 'lbank', lbankExchangeInfo.exchangeData, [])
}

const changeKuCoin = (coins) => {
    commonExchange(coins, kucoinArr, 'kucoin', kucoinExchangeInfo.exchangeData, kucoinMargin.marginData)
}

module.exports = { changeBinance, changeMexc, changeBybit, changeGateIo, changeCoinbase, changeLBank, changeKuCoin}