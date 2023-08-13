const { bybitMargin } = require('../../Margin/marginData')
let { bybitExchangeInfo } = require('../ExchangeData')
const axios = require("axios")

const getExchangeInfoBybit = async () => {

    const urlsArr = ['https://api.bybit.com/v5/market/instruments-info?category=spot', 'https://api2.bybit.com/spot/api/basic/symbol_list']
    let arrRequest = urlsArr.map((url) => fetch(url).then((response) => response.json()))

    let data
    let symbol_list
    await Promise.all(arrRequest)
    .then(results => { 
        data = results[0].result.list
        symbol_list = results[1].result[0].quoteTokenSymbols
    })

    for(let i=0; i<data.length; i++) {
        const name = symbol_list.find((item) => item.baseTokenId === data[i].baseCoin)
        if(name) {
            data[i].name = name.tokenFullName.toLowerCase()
        }
        data[i].baseAsset = data[i].baseCoin
        data[i].quoteAsset = data[i].quoteCoin

        if((data[i].marginTrading == 'both') ||(data[i].marginTrading == 'normalSpotOnly')) {
            data[i].cross = true
            data[i].isolated = false
        } else{
            data[i].cross = false
            data[i].isolated = false
        }
 
    }
    bybitMargin.marginData = [...data]
    bybitExchangeInfo.exchangeData = [...data]
    return bybitExchangeInfo.exchangeData
}

module.exports = { getExchangeInfoBybit };
