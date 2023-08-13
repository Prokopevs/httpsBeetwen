let { poloniexExchangeInfo } = require('../ExchangeData')
const axios = require("axios")

const getExchangeInfoPoloniex = async () => {
    const response = await axios.get('https://api.poloniex.com/markets')
    let data = response.data
    for(let i=0; i<data.length; i++) {
        data[i].symbol = data[i].symbol.replace(/_/g, "")
        data[i].baseAsset = data[i].baseCurrencyName
        data[i].quoteAsset = data[i].quoteCurrencyName
    }
    poloniexExchangeInfo.exchangeData = [...data]
    return poloniexExchangeInfo.exchangeData
}

module.exports = { getExchangeInfoPoloniex };
