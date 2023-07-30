let { binanceExchangeInfo, mexcExchangeInfo, bybitExchangeInfo, gateIoExchangeInfo, lbankExchangeInfo  } = require('../ExtraInfo/ExchangeData')
let { binanceFee, mexcFee, fullNameFromCMCArr, gateIoFeek, lbankFee } = require('../Fee/feeData')


const fullArr = [ [lbankExchangeInfo, lbankFee, 'coin'] ]
// [binanceExchangeInfo, binanceFee, 'coin'], [mexcExchangeInfo, mexcFee, 'coin'], [bybitExchangeInfo, fullNameFromCMCArr, 'symbol'], [gateIoExchangeInfo, gateIoFee, 'coin'], [lbankExchangeInfo, fullNameFromCMCArr, 'symbol'],
const mergeAllFeesAndExchangeInfo = async () => {
    await getFullCoinNameFromCMC()
    for(let i=0; i<fullArr.length; i++) {
        mergeSingleFeeAndExchangeInfo(fullArr[i][0].exchangeData, fullArr[i][1].feeData, fullArr[i][2])
    }
}

const mergeSingleFeeAndExchangeInfo = (ExchangeInfo, Fee, key) => {
    // for(let i=0; i<ExchangeInfo.length; i++) {
    //     let elemFee = Fee.find((elem) => elem[key] == ExchangeInfo[i].baseAsset)
    //     if(elemFee !== undefined) {
    //         ExchangeInfo[i].name = elemFee.name.toLowerCase()
    //     } else {
    //         // console.log(ExchangeInfo[i].baseAsset)
    //     }
    // }
    function check3L(symbol) {
        if (symbol.indexOf('3L') > -1) {
            return true
        }
        if (symbol.indexOf('3S') > -1) {
            return true
        }
        if (symbol.indexOf('5L') > -1) {
            return true
        }
        if (symbol.indexOf('5S') > -1) {
            return true
        }
        return false
    } 

    for(let i=0; i<ExchangeInfo.length; i++) {
        const check = check3L(ExchangeInfo[i].symbol)
            if(check) {
                ExchangeInfo.splice(i, 1)
                i--
                continue
            }
    }

    const arr = []
    for(let i=0; i<ExchangeInfo.length; i++) {
        let elemFee = Fee.find((elem) => elem[key] == ExchangeInfo[i].baseAsset)
        if(elemFee) {
            for(let j=0; j<elemFee.networkList.length; j++) {
                if(!elemFee.networkList[j].withdrawFee) {
                    arr.push(elemFee.coin)
                }
            }
        }
    }
    console.log(arr.length)

    // const obj = {}
    // for(let i=0; i<ExchangeInfo.length; i++) {
    //     let elemFee = Fee.find((elem) => elem[key] == ExchangeInfo[i].baseAsset)
    //     if(elemFee) {
    //         for(let j=0; j<elemFee.networkList.length; j++) {
    //             if(!elemFee.networkList[j].withdrawFee) {
    //                 const network = elemFee.networkList[j].name
    //                 obj[elemFee.coin] = {...obj[elemFee.coin], [network]:0}
    //             }
    //         }
    //     }
    // }
    // console.log(obj)
    // logEvents(JSON.stringify(obj), 'coins.log')
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
            fullNameFromCMCArr.feeData = [...results[0].data, ...results[1].data, ...results[2].data]
        })
}



module.exports = { mergeAllFeesAndExchangeInfo, mergeSingleFeeAndExchangeInfo };