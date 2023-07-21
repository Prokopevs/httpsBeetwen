let { getMarginBinance } = require('./GetMarginInfo/getMarginBinance')

const fetchAllMargins = async() => {
    console.log('запрос на Margin...')
    await Promise.all([
        getMarginBinance(),
    ])
}

module.exports = { fetchAllMargins };
