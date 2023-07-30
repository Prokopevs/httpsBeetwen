let { lbankExchangeInfo } = require('../ExchangeData')
const axios = require("axios")

const getExchangeInfoLBank = async () => {
    const response = await axios.get('https://api.lbkex.com/v2/supplement/ticker/price.do')
    let data = response.data.data
    for(let i=0; i<data.length; i++) {
        const baseQuoteArr = data[i].symbol.toUpperCase().split('_')
        data[i].symbol = data[i].symbol.replace(/_/g, "").toUpperCase()
        data[i].baseAsset = baseQuoteArr[0]
        data[i].quoteAsset = baseQuoteArr[1]
    }
    lbankExchangeInfo.exchangeData = [...data]
    return lbankExchangeInfo.exchangeData
}

module.exports = { getExchangeInfoLBank };
