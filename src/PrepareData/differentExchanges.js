let { binanceArr, mexcArr, bybitArr, gateIoArr, coinbaseArr, lbankArr, kucoinArr, okxArr, bitgetArr, huobiArr, poloniexArr, bitmartArr } = require('./ExchangesArray')
let { commonExchange } = require('./commonExchange')
let { binanceExchangeInfo, mexcExchangeInfo, bybitExchangeInfo, gateIoExchangeInfo, coinbaseExchangeInfo, lbankExchangeInfo, kucoinExchangeInfo, okxExchangeInfo, bitgetExchangeInfo, huobiExchangeInfo, poloniexExchangeInfo, bitmartExchangeInfo } = require('../ExtraInfo/ExchangeData')
let { binanceMargin, gateIoMargin, bybitMargin, kucoinMargin, okxMargin, bitgetMargin, huobiMargin, poloniexMargin, bitmartMargin } = require('.././Margin/marginData')


const changeBinance = async (coins) => {
    await commonExchange(coins, binanceArr, 'binance', binanceExchangeInfo.exchangeData, binanceMargin.marginData)
}

const changeMexc = async (coins) => {
    await commonExchange(coins, mexcArr, 'mexc', mexcExchangeInfo.exchangeData, [])
}

const changeBybit = async (coins) => {
    await commonExchange(coins, bybitArr, 'bybit', bybitExchangeInfo.exchangeData, bybitMargin.marginData)
}

const changeGateIo = async (coins) => {
    await commonExchange(coins, gateIoArr, 'gateIo', gateIoExchangeInfo.exchangeData, gateIoMargin.marginData)
}

const changeCoinbase = async (coins) => {
    // await commonExchange(coins, coinbaseArr, 'coinbase', coinbaseExchangeInfo.exchangeData, [])
}

const changeLBank = async (coins) => {
    await commonExchange(coins, lbankArr, 'lbank', lbankExchangeInfo.exchangeData, [])
}

const changeKuCoin = async (coins) => {
    await commonExchange(coins, kucoinArr, 'kucoin', kucoinExchangeInfo.exchangeData, kucoinMargin.marginData)
}

const changeOKX = async (coins) => {
    await commonExchange(coins, okxArr, 'okx', okxExchangeInfo.exchangeData, okxMargin.marginData)
}

const changeBitget = async (coins) => {
    await commonExchange(coins, bitgetArr, 'bitget', bitgetExchangeInfo.exchangeData, bitgetMargin.marginData)
}

const changeHuobi = async (coins) => {
    await commonExchange(coins, huobiArr, 'huobi', huobiExchangeInfo.exchangeData, huobiMargin.marginData)
}

const changePoloniex = async (coins) => {
    await commonExchange(coins, poloniexArr, 'poloniex', poloniexExchangeInfo.exchangeData, poloniexMargin.marginData)
}

const changeBitMart = async (coins) => {
    await commonExchange(coins, bitmartArr, 'bitmart', bitmartExchangeInfo.exchangeData, bitmartMargin.marginData)
}

module.exports = { changeBinance, changeMexc, changeBybit, changeGateIo, changeCoinbase, changeLBank, changeKuCoin, changeOKX, changeBitget, changeHuobi, changePoloniex, changeBitMart}