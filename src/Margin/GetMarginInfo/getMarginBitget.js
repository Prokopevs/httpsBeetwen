let { bitgetMargin } = require('../marginData')
const axios = require("axios")

const getMarginBitget = async () => {
    const response = await axios.get('https://api.bitget.com/api/margin/v1/public/currencies')
    let data = response.data.data
    for(let i=0; i<data.length; i++) {
        data[i].isolated = Number(data[i].maxIsolatedLeverage) ? true : false
        data[i].cross = Number(data[i].maxCrossLeverage) ? true : false
    }

    bitgetMargin.marginData = [...data]
}

module.exports = { getMarginBitget };