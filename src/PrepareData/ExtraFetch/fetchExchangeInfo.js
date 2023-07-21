const { binanceExchangeInfo, mexcExchangeInfo, bybitExchangeInfo } = require('../../ExtraInfo/ExchangeData')
let { getExchangeInfoBinance } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoBinance')
const { getExchangeInfoBybit } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoBybit')
let { getExchangeInfoMexc } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoMexc')
const { getFeeBinance } = require('../../Fee/GetFee/getFeeBinance')
const { getFeeMexc } = require('../../Fee/GetFee/getFeeMexc')
const { binanceFee, mexcFee, fullNameFromCMCArr } = require('../../Fee/feeData')
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
            getExchangeInfoBybit()
    
        ]).then(() => { 
            mergeSingleFeeAndExchangeInfo(bybitExchangeInfo.exchangeData, fullNameFromCMCArr, 'symbol')
            return bybitExchangeInfo.exchangeData
        }) 
    }
}

module.exports = { fetchExchangeInfo }