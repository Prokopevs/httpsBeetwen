const { binanceExchangeInfo, mexcExchangeInfo, bybitExchangeInfo, gateIoExchangeInfo, coinbaseExchangeInfo, lbankExchangeInfo, kucoinExchangeInfo, okxExchangeInfo, bitgetExchangeInfo, poloniexExchangeInfo, bitmartExchangeInfo, huobiExchangeInfo } = require('../../ExtraInfo/ExchangeData')
let { getExchangeInfoBinance } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoBinance')
const { getExchangeInfoBitMart } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoBitMart')
const { getExchangeInfoBitget } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoBitget')
const { getExchangeInfoBybit } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoBybit')
const { getExchangeInfoCoinbase } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoCoinbase')
const { getExchangeInfoGateIo } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoGateIo')
const { getExchangeInfoHuobi } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoHuobi')
const { getExchangeInfoLBank } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoLBank')
let { getExchangeInfoMexc } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoMexc')
const { getExchangeInfoOKX } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoOKX')
const { getExchangeInfoPoloniex } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoPoloniex')
const { getFeeBinance } = require('../../Fee/GetFee/getFeeBinance')
const { getFeeBitMart } = require('../../Fee/GetFee/getFeeBitMart')
const { getFeeBitget } = require('../../Fee/GetFee/getFeeBitget')
const { getFeeBybit } = require('../../Fee/GetFee/getFeeBybit')
const { getFeeGateIo } = require('../../Fee/GetFee/getFeeGateIo')
const { getFeeHuobi } = require('../../Fee/GetFee/getFeeHuobi')
const { getFeeLBank } = require('../../Fee/GetFee/getFeeLBank')
const { getFeeMexc } = require('../../Fee/GetFee/getFeeMexc')
const { getFeeOKX } = require('../../Fee/GetFee/getFeeOKX')
const { getFeePoloniex } = require('../../Fee/GetFee/getFeePoloniex')
const { binanceFee, mexcFee, fullNameFromCMCArr, gateIoFee, okxFee, bitgetFee, poloniexFee, bitmartFee } = require('../../Fee/feeData')
const { mergeSingleFeeAndExchangeInfo } = require('../../Utils/mergeAllFeesAndExchangeInfo')

const fetchExchangeInfo = async (exchangeName) => {
    if(exchangeName === 'binance') { 
        await Promise.all([
            getExchangeInfoBinance(),
            getFeeBinance(),
        ]).then(() => { 
            mergeSingleFeeAndExchangeInfo(binanceExchangeInfo.exchangeData, binanceFee.feeData, 'coin')
        }) 
        return binanceExchangeInfo.exchangeData
    }

    if(exchangeName === 'mexc') {
        await Promise.all([
            getExchangeInfoMexc(),
            getFeeMexc(),
    
        ]).then(() => { 
            mergeSingleFeeAndExchangeInfo(mexcExchangeInfo.exchangeData, mexcFee.feeData, 'coin')
        }) 
        return mexcExchangeInfo.exchangeData
    }

    if(exchangeName === 'bybit') {
        await Promise.all([
            getExchangeInfoBybit(),
            getFeeBybit()
        ]).then(() => { 
        }) 
        return bybitExchangeInfo.exchangeData
    }

    if(exchangeName === 'gateIo') {
        await Promise.all([
            getExchangeInfoGateIo(),
            getFeeGateIo()
        ]).then(() => { 
            mergeSingleFeeAndExchangeInfo(gateIoExchangeInfo.exchangeData, gateIoFee.feeData, 'coin')
        }) 
        return gateIoExchangeInfo.exchangeData
    }

    if(exchangeName === 'coinbase') {
        await Promise.all([
            getExchangeInfoCoinbase(),
        ]).then(() => { 
        }) 
        return coinbaseExchangeInfo.exchangeData
    }

    if(exchangeName === 'lbank') {
        await Promise.all([
            getExchangeInfoLBank(),
        ]).then(() => { 
            mergeSingleFeeAndExchangeInfo(lbankExchangeInfo.exchangeData, fullNameFromCMCArr.feeData, 'symbol')
        }) 
        return lbankExchangeInfo.exchangeData
    }

    if(exchangeName === 'kucoin') {
        return kucoinExchangeInfo.exchangeData
    }

    if(exchangeName === 'okx') {
        await Promise.all([
            getExchangeInfoOKX(),
            getFeeOKX()
        ]).then(() => { 
            mergeSingleFeeAndExchangeInfo(okxExchangeInfo.exchangeData, okxFee.feeData, 'coin')
        }) 
        return okxExchangeInfo.exchangeData
    }
    if(exchangeName === 'bitget') {
        await Promise.all([
            getExchangeInfoBitget(),
            getFeeBitget()
        ]).then(() => { 
            mergeSingleFeeAndExchangeInfo(bitgetExchangeInfo.exchangeData, bitgetFee.feeData, 'symbol')
        }) 
        return bitgetExchangeInfo.exchangeData
    }
    if(exchangeName === 'huobi') {
        await Promise.all([
            getExchangeInfoHuobi()
        ]).then(() => { 
        }) 
        return huobiExchangeInfo.exchangeData
    }
    if(exchangeName === 'poloniex') {
        await Promise.all([
            getExchangeInfoPoloniex(),
            getFeePoloniex()
        ]).then(() => { 
            mergeSingleFeeAndExchangeInfo(poloniexExchangeInfo.exchangeData, poloniexFee.feeData, 'coin')
        }) 
        return poloniexExchangeInfo.exchangeData
    }
    if(exchangeName === 'bitmart') {
        await Promise.all([
            getExchangeInfoBitMart(),
            getFeeBitMart()
        ]).then(() => { 
            mergeSingleFeeAndExchangeInfo(bitmartExchangeInfo.exchangeData, bitmartFee.feeData, 'coin')
        }) 
        return bitmartExchangeInfo.exchangeData
    }
}

module.exports = { fetchExchangeInfo }