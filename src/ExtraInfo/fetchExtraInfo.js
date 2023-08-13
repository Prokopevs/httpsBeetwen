const { getExchangeInfoBinance } = require('./GetExchangeInfo/getExchangeInfoBinance')
const { getExchangeInfoBybit } = require('./GetExchangeInfo/getExchangeInfoBybit')
const { getExchangeInfoMexc } = require('./GetExchangeInfo/getExchangeInfoMexc')
const { getExchangeInfoGateIo } = require('./GetExchangeInfo/getExchangeInfoGateIo')
const { getExchangeInfoCoinbase } = require('./GetExchangeInfo/getExchangeInfoCoinbase')
const { getExchangeInfoLBank } = require('./GetExchangeInfo/getExchangeInfoLBank')
const { getExchangeInfoKuCoin } = require('./GetExchangeInfo/getExchangeInfoKuCoin')
const { getExchangeInfoOKX } = require('./GetExchangeInfo/getExchangeInfoOKX')
const { getExchangeInfoBitget } = require('./GetExchangeInfo/getExchangeInfoBitget')
const { getExchangeInfoHuobi } = require('./GetExchangeInfo/getExchangeInfoHuobi')
const { getExchangeInfoPoloniex } = require('./GetExchangeInfo/getExchangeInfoPoloniex')

const fetchExtraInfo = async() => {
    console.log('запрос на ExchangeInfo...')
    await Promise.all([
        getExchangeInfoBinance(),
        getExchangeInfoMexc(),
        getExchangeInfoBybit(),
        getExchangeInfoGateIo(),
        getExchangeInfoCoinbase(),
        getExchangeInfoLBank(),
        getExchangeInfoKuCoin(),
        getExchangeInfoOKX(),
        getExchangeInfoBitget(),
        getExchangeInfoHuobi(),
        getExchangeInfoPoloniex()
    ])
}

module.exports = { fetchExtraInfo };
