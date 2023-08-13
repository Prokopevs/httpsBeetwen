let { poloniexMargin } = require('../marginData')
const axios = require("axios")

const getMarginPoloniex = async () => {
    const res = await axios.get('https://api.poloniex.com/markets')
    const data = res.data
    const marginArr= []
    for(let i=0; i<data.length; i++) {
        if(data[i].crossMargin.supportCrossMargin == true) {
            data[i].symbol = data[i].symbol.replace(/_/g, "")
            data[i].cross = true
            data[i].isolated = false
            marginArr.push(data[i])
        }
    }
    poloniexMargin.marginData = marginArr
}

module.exports = { getMarginPoloniex };