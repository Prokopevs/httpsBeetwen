let { bitmartExchangeInfo } = require('../ExchangeData')
const axios = require("axios")

const getExchangeInfoBitMart = async () => {
    const response = await axios.get('https://api-cloud.bitmart.com/spot/v1/symbols/details')
    let data = response.data.data.symbols
    for(let i=0; i<data.length; i++) {
        data[i].symbol = data[i].symbol.replace(/_/g, "")
        data[i].baseAsset = data[i].base_currency
        data[i].quoteAsset = data[i].quote_currency
    }

    bitmartExchangeInfo.exchangeData = [...data]
    return bitmartExchangeInfo.exchangeData
}

module.exports = { getExchangeInfoBitMart };
