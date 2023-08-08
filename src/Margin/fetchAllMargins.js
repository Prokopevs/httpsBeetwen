let { getMarginBinance } = require('./GetMarginInfo/getMarginBinance');
const { getMarginBitget } = require('./GetMarginInfo/getMarginBitget');
const { getMarginGateIo } = require('./GetMarginInfo/getMarginGateIo');
const { getMarginKuCoin } = require('./GetMarginInfo/getMarginKuCoin');
const { getMarginOKX } = require('./GetMarginInfo/getMarginOKX');
const { getMarginHuobi } = require('./GetMarginInfo/getMarginHuobi');

const fetchAllMargins = async() => {
    console.log('запрос на Margin...')
    await Promise.all([
        getMarginBinance(),
        getMarginGateIo(),
        getMarginKuCoin(),
        getMarginOKX(),
        getMarginBitget(),
        getMarginHuobi(),
    ])
}

module.exports = { fetchAllMargins };
