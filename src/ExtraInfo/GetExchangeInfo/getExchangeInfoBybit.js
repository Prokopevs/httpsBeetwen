let { bybitExchangeInfo } = require('../ExchangeData')
const axios = require("axios")

const getExchangeInfoBybit = async () => {
    const response = await axios.get('https://api.bybit.com/v5/market/instruments-info?category=spot')
    let data = response.data.result.list

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

    bybitExchangeInfo.exchangeData = [...data]
    return bybitExchangeInfo.exchangeData
}

module.exports = { getExchangeInfoBybit };