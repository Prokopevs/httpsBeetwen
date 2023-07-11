let { binanceExchangeInfo } = require('../ExchangeData')

const getExchangeInfoBinance = async () => {
    const response = await axios.get('https://api.binance.com/api/v3/exchangeInfo')
    let data = response.data.symbols
    binanceExchangeInfo.exchangeData = [...data]

    return binanceExchangeInfo.exchangeData
}

module.exports = { getExchangeInfoBinance };
