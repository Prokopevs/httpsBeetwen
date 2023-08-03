let { binanceExchangeInfo, mexcExchangeInfo, bybitExchangeInfo, gateIoExchangeInfo, lbankExchangeInfo, kucoinExchangeInfo, okxExchangeInfo, bitgetExchangeInfo } = require('../ExtraInfo/ExchangeData')
let { binanceFee, mexcFee, fullNameFromCMCArr, gateIoFee, kucoinFee, okxFee, allInFullNameFromBitget } = require('../Fee/feeData')


const fullArr = [ [binanceExchangeInfo, binanceFee, 'coin'], [mexcExchangeInfo, mexcFee, 'coin'], [gateIoExchangeInfo, gateIoFee, 'coin'], [lbankExchangeInfo, fullNameFromCMCArr, 'symbol'], [kucoinExchangeInfo, kucoinFee, 'coin'], [okxExchangeInfo, okxFee, 'coin'], [bitgetExchangeInfo, fullNameFromCMCArr, 'symbol'],] 

const mergeAllFeesAndExchangeInfo = async () => {
    await getFullCoinNameFromCMC()
    for(let i=0; i<fullArr.length; i++) {
        mergeSingleFeeAndExchangeInfo(fullArr[i][0].exchangeData, fullArr[i][1].feeData, fullArr[i][2])
    }
}

const mergeSingleFeeAndExchangeInfo = (ExchangeInfo, Fee, key) => {
    for(let i=0; i<ExchangeInfo.length; i++) {
        let elemFee = Fee.find((elem) => elem[key] == ExchangeInfo[i].baseAsset)
        if(elemFee !== undefined) {
            ExchangeInfo[i].name = elemFee.name.toLowerCase()
        } else {
            // console.log(ExchangeInfo[i].baseAsset)
        }
    }
}


const getFullCoinNameFromCMC = async () => {
    let urlsArr = [
        'https://web-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=5000',
        'https://web-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=5000&limit=5000',
        'https://web-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=10000&limit=5000'
    ]

    let requests = urlsArr.map((url) => fetch(url).then((response) => response.json()))
    await Promise.all(requests)
        .then(results => { 
            fullNameFromCMCArr.feeData = [...results[0].data, ...results[1].data, ...results[2].data, ...allInFullNameFromBitget]
        })
}



module.exports = { mergeAllFeesAndExchangeInfo, mergeSingleFeeAndExchangeInfo };