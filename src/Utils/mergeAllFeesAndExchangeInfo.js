let { binanceExchangeInfo, mexcExchangeInfo,  } = require('../ExtraInfo/ExchangeData')
let { binanceFee, mexcFee,  } = require('../Fee/feeData')

const fullArr = [ [binanceExchangeInfo, binanceFee], [mexcExchangeInfo, mexcFee] ]

const mergeAllFeesAndExchangeInfo = () => {
    for(let i=0; i<fullArr.length; i++) {
        mergeSingleFeeAndExchangeInfo(fullArr[i][0].exchangeData, fullArr[i][1].feeData)
    }
}

const mergeSingleFeeAndExchangeInfo = (ExchangeInfo, Fee) => {
    for(let i=0; i<ExchangeInfo.length; i++) {
        let elemFee = Fee.find((elem) => elem.coin == ExchangeInfo[i].baseAsset)
        if(elemFee !== undefined) {
            ExchangeInfo[i].name = elemFee.name.toLowerCase()

            // if(ExchangeInfo[i].symbol == 'ETHUSDT') {
            //     console.log(ExchangeInfo[i])
            //     console.log(elemFee)
            // }
        } 
    }
    
    
}

module.exports = { mergeAllFeesAndExchangeInfo, mergeSingleFeeAndExchangeInfo };