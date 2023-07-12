const { binanceExchangeInfo, mexcExchangeInfo } = require('../../ExtraInfo/ExchangeData')
let { getExchangeInfoBinance } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoBinance')
let { getExchangeInfoMexc } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoMexc')
const { getFeeBinance } = require('../../Fee/GetFee/getFeeBinance')
const { getFeeMexc } = require('../../Fee/GetFee/getFeeMexc')
const { binanceFee, mexcFee } = require('../../Fee/feeData')
const { mergeSingleFeeAndExchangeInfo } = require('../../Utils/mergeAllFeesAndExchangeInfo')

const fetchExchangeInfo = async (exchangeName) => {
    if(exchangeName === 'binance') { 
        await Promise.all([
            getExchangeInfoBinance(),
            getFeeBinance(),
    
        ]).then(results => { 
            binanceExchangeInfo.exchangeData = results[0]
            binanceFee.feeData = results[1]
            mergeSingleFeeAndExchangeInfo(binanceExchangeInfo.exchangeData, binanceFee.feeData)

            return binanceExchangeInfo.exchangeData
        }) 
    }

    if(exchangeName === 'mexc') {
        await Promise.all([
            getExchangeInfoMexc(),
            getFeeMexc(),
    
        ]).then(results => { 
            mexcExchangeInfo.exchangeData = results[0]
            mexcFee.feeData = results[1]
            mergeSingleFeeAndExchangeInfo(mexcExchangeInfo.exchangeData, mexcFee.feeData)

            return mexcExchangeInfo.exchangeData
        }) 
    }
}

module.exports = { fetchExchangeInfo }