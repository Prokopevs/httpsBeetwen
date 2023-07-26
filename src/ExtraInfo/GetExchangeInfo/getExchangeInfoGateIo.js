let { gateIoExchangeInfo } = require('../ExchangeData')
const axios = require("axios")

const getExchangeInfoGateIo = async () => {
    const response = await axios.get('https://api.gateio.ws/api/v4/spot/currency_pairs')
    let data = response.data

    for(let i=0; i<data.length; i++) {
        data[i].symbol = data[i].id.replace(/_/g, "")
        data[i].baseAsset = data[i].base
        data[i].quoteAsset = data[i].quote
    }
    
    
    gateIoExchangeInfo.exchangeData = [...data]
    return gateIoExchangeInfo.exchangeData
}

module.exports = { getExchangeInfoGateIo };
