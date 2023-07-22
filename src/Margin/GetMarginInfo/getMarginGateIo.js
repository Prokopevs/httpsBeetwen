let { gateIoMargin } = require('../marginData')
const axios = require("axios")

const getMarginGateIo = async () => {
    const response = await axios.get('https://api.gateio.ws/api/v4/margin/currency_pairs')
    let data = response.data
    
    for(let i=0; i<data.length; i++) {
        data[i].symbol = data[i].id
        data[i].isolated = true
        data[i].cross = false
    }
}

module.exports = { getMarginGateIo };