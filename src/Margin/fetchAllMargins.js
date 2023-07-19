let { binanceMargin,  } = require('./marginData')
let { getMarginBinance } = require('./GetMarginInfo/getMarginBinance')


const fetchAllMargins = async() => {
    console.log('запрос на Margin...')
    await Promise.all([
        getMarginBinance(),

    ]).then(results => { 
        binanceMargin.marginData = results[0]
    }) 
}

module.exports = { fetchAllMargins };
