const { binanceExchangeInfo, mexcExchangeInfo, bybitExchangeInfo, gateIoExchangeInfo } = require('../../ExtraInfo/ExchangeData')
let { getExchangeInfoBinance } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoBinance')
const { getExchangeInfoBybit } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoBybit')
const { getExchangeInfoGateIo } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoGateIo')
let { getExchangeInfoMexc } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoMexc')
const { getFeeBinance } = require('../../Fee/GetFee/getFeeBinance')
const { getFeeBybit } = require('../../Fee/GetFee/getFeeBybit')
const { getFeeGateIo } = require('../../Fee/GetFee/getFeeGateIo')
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
}

module.exports = { fetchExchangeInfo }