let { getExchangeInfoBinance } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoBinance')
let { getExchangeInfoMexc } = require('../../ExtraInfo/GetExchangeInfo/getExchangeInfoMexc')

const fetchExchangeInfo = async (exchangeName) => {
    if(exchangeName === 'binance') {
        return await getExchangeInfoBinance()
    }
    if(exchangeName === 'mexc') {
        return await getExchangeInfoMexc()
    }
}

module.exports = { fetchExchangeInfo }