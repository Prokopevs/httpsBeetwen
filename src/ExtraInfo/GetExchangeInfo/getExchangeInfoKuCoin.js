let { kucoinExchangeInfo } = require('../ExchangeData')
const axios = require("axios")

const getExchangeInfoKuCoin = async () => {
    const response = await axios.get('https://api.kucoin.com/api/v2/symbols')
    let data = response.data.data
    for(let i=0; i<data.length; i++) {
        data[i].symbol = data[i].symbol.replace(/-/g, "")
        data[i].baseAsset = data[i].baseCurrency
        data[i].quoteAsset = data[i].quoteCurrency
    }
    kucoinExchangeInfo.exchangeData = [...data]
    return kucoinExchangeInfo.exchangeData
}

module.exports = { getExchangeInfoKuCoin };