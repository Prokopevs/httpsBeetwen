let { okxMargin } = require('../marginData')
const axios = require("axios")

const getMarginOKX = async () => {
    const res = await axios.get('https://www.okx.cab/api/v5/public/instruments?instType=MARGIN')
    const data = res.data.data
    for(let i=0; i<data.length; i++) {
        data[i].symbol = data[i].instId.replace(/-/g, "")
        data[i].cross = true
        data[i].isolated = true
    }

    okxMargin.marginData = data
}

module.exports = { getMarginOKX };