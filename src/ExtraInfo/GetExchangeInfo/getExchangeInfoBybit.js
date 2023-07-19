let { bybitExchangeInfo } = require('../ExchangeData')
const axios = require("axios")

const getExchangeInfoBybit = async () => {
    const response = await axios.get('https://api.bybit.com/v5/market/instruments-info?category=spot')
    // const response2 = await axios.get('https://api.bybit.com/v5/market/tickers?category=spot')
    let data = response.data.result.list
    // let data2 = response2.data.result.list

    for(let i=0; i<data.length; i++) {
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

    // for(let i=0; i<data2.length; i++) {
    //     const item = data.find((item) => item.symbol == data2[i].symbol)
    //     if(item == undefined) {
    //         console.log(data2[i])
    //     }
    // }

    bybitExchangeInfo.exchangeData = [...data]
    return bybitExchangeInfo.exchangeData
}

module.exports = { getExchangeInfoBybit };
