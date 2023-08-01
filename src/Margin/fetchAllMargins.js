let { getMarginBinance } = require('./GetMarginInfo/getMarginBinance');
const { getMarginGateIo } = require('./GetMarginInfo/getMarginGateIo');
const { getMarginKuCoin } = require('./GetMarginInfo/getMarginKuCoin');

const fetchAllMargins = async() => {
    console.log('запрос на Margin...')
    await Promise.all([
        getMarginBinance(),
        getMarginGateIo(),
        getMarginKuCoin()
    ])
}

module.exports = { fetchAllMargins };
