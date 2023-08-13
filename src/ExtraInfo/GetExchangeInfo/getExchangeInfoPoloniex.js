let { okxExchangeInfo } = require('../ExchangeData')
const axios = require("axios")

const getExchangeInfoPoloniex = async () => {
    const response = await axios.get('https://www.okx.cab/api/v5/public/instruments?instType=SPOT')
    let data = response.data.data
    for(let i=0; i<data.length; i++) {
        data[i].symbol = data[i].instId.replace(/-/g, "")
        data[i].baseAsset = data[i].baseCcy
        data[i].quoteAsset = data[i].quoteCcy
    }

    okxExchangeInfo.exchangeData = [...data]
    return okxExchangeInfo.exchangeData
}

module.exports = { getExchangeInfoPoloniex };
