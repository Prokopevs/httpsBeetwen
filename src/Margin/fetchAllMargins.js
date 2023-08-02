let { getMarginBinance } = require('./GetMarginInfo/getMarginBinance');
const { getMarginGateIo } = require('./GetMarginInfo/getMarginGateIo');
const { getMarginKuCoin } = require('./GetMarginInfo/getMarginKuCoin');
const { getMarginOKX } = require('./GetMarginInfo/getMarginOKX');

const fetchAllMargins = async() => {
    console.log('запрос на Margin...')
    await Promise.all([
        getMarginBinance(),
        getMarginGateIo(),
        getMarginKuCoin(),
        getMarginOKX(),
    ])
}

module.exports = { fetchAllMargins };
