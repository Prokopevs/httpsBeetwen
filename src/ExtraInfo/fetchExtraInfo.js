const { getExchangeInfoBinance } = require('./GetExchangeInfo/getExchangeInfoBinance')
const { getExchangeInfoBybit } = require('./GetExchangeInfo/getExchangeInfoBybit')
const { getExchangeInfoMexc } = require('./GetExchangeInfo/getExchangeInfoMexc')
const { getExchangeInfoGateIo } = require('./GetExchangeInfo/getExchangeInfoGateIo')

const fetchExtraInfo = async() => {
    console.log('запрос на ExchangeInfo...')
    await Promise.all([
        getExchangeInfoBinance(),
        getExchangeInfoMexc(),
        getExchangeInfoBybit(),
        getExchangeInfoGateIo(),
    ])
}

module.exports = { fetchExtraInfo };
