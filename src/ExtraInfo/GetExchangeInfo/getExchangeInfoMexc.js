let { mexcExchangeInfo } = require('../ExchangeData')
const axios = require("axios")

const getExchangeInfoMexc = async () => {
    const response = await axios.get('https://api.mexc.com/api/v3/exchangeInfo')
    let data = response.data.symbols
    mexcExchangeInfo.exchangeData = [...data]

    return mexcExchangeInfo.exchangeData
}

module.exports = { getExchangeInfoMexc };
