let { bitgetExchangeInfo } = require('../ExchangeData')
const axios = require("axios")

const getExchangeInfoBitget = async () => {
    const response = await axios.get('https://api.bitget.com/api/spot/v1/public/products')
    let data = response.data.data
    for(let i=0; i<data.length; i++) {
        data[i].symbol = data[i].symbolName
        data[i].baseAsset = data[i].baseCoin
        data[i].quoteAsset = data[i].quoteCoin
    }

    bitgetExchangeInfo.exchangeData = [...data]
    return bitgetExchangeInfo.exchangeData
}

module.exports = { getExchangeInfoBitget };
