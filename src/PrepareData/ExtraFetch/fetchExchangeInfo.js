const { binanceExchangeInfo, mexcExchangeInfo, bybitExchangeInfo, gateIoExchangeInfo, coinbaseExchangeInfo, lbankExchangeInfo, kucoinExchangeInfo } = require('../../ExtraInfo/ExchangeData')
let { getExchangeInfoBinance } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoBinance')
const { getExchangeInfoBybit } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoBybit')
const { getExchangeInfoCoinbase } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoCoinbase')
const { getExchangeInfoGateIo } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoGateIo')
const { getExchangeInfoLBank } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoLBank')
let { getExchangeInfoMexc } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoMexc')
const { getFeeBinance } = require('../../Fee/GetFee/getFeeBinance')
const { getFeeBybit } = require('../../Fee/GetFee/getFeeBybit')
const { getFeeGateIo } = require('../../Fee/GetFee/getFeeGateIo')
const { getFeeLBank } = require('../../Fee/GetFee/getFeeLBank')
const { getFeeMexc } = require('../../Fee/GetFee/getFeeMexc')
const { binanceFee, mexcFee, fullNameFromCMCArr, gateIoFee } = require('../../Fee/feeData')
const { mergeSingleFeeAndExchangeInfo } = require('../../Utils/mergeAllFeesAndExchangeInfo')

const fetchExchangeInfo = async (exchangeName) => {
    if(exchangeName === 'binance') { 
        await Promise.all([
            getExchangeInfoBinance(),
            getFeeBinance(),
    
        ]).then(() => { 
            mergeSingleFeeAndExchangeInfo(binanceExchangeInfo.exchangeData, binanceFee.feeData, 'coin')
            return binanceExchangeInfo.exchangeData
        }) 
    }

    if(exchangeName === 'mexc') {
        await Promise.all([
            getExchangeInfoMexc(),
            getFeeMexc(),
    
        ]).then(() => { 
            mergeSingleFeeAndExchangeInfo(mexcExchangeInfo.exchangeData, mexcFee.feeData, 'coin')
            return mexcExchangeInfo.exchangeData
        }) 
    }

    if(exchangeName === 'bybit') {
        await Promise.all([
            getExchangeInfoBybit(),
            getFeeBybit()
        ]).then(() => { 
            mergeSingleFeeAndExchangeInfo(bybitExchangeInfo.exchangeData, fullNameFromCMCArr, 'symbol')
            return bybitExchangeInfo.exchangeData
        }) 
    }

    if(exchangeName === 'gateIo') {
        await Promise.all([
            getExchangeInfoGateIo(),
            getFeeGateIo()
        ]).then(() => { 
            mergeSingleFeeAndExchangeInfo(gateIoExchangeInfo.exchangeData, gateIoFee.feeData, 'coin')
            return gateIoExchangeInfo.exchangeData
        }) 
    }

    if(exchangeName === 'coinbase') {
        await Promise.all([
            getExchangeInfoCoinbase(),
        ]).then(() => { 
            return coinbaseExchangeInfo.exchangeData
        }) 
    }

    if(exchangeName === 'lbank') {
        await Promise.all([
            getExchangeInfoLBank(),
            getFeeLBank()
        ]).then(() => { 
            mergeSingleFeeAndExchangeInfo(lbankExchangeInfo.exchangeData, fullNameFromCMCArr, 'symbol')
            return lbankExchangeInfo.exchangeData
        }) 
    }

    if(exchangeName === 'kucoin') {
        return kucoinExchangeInfo.exchangeData
    }
}

module.exports = { fetchExchangeInfo }