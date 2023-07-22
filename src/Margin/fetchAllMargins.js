let { getMarginBinance } = require('./GetMarginInfo/getMarginBinance');
const { getMarginGateIo } = require('./GetMarginInfo/getMarginGateIo');

const fetchAllMargins = async() => {
    console.log('запрос на Margin...')
    await Promise.all([
        getMarginBinance(),
        getMarginGateIo()
    ])
}

module.exports = { fetchAllMargins };
