const axios = require("axios")
let { bitgetFee } = require('../feeData')

const getFeeBitget = async () => {
    const result = await axios.get('https://api.bitget.com/api/spot/v1/public/currencies')
    const data = result.data.data
    for(let i=0; i<data.length; i++) {
        data[i].coin = data[i].coinName
        const chains = data[i].chains
        for(let j=0; j<chains.length; j++) {
            chains[j].rechargeable = chains[j].rechargeable === 'true' ? true : false
            chains[j].withdrawable = chains[j].withdrawable === 'true' ? true : false
        }
    }
    bitgetFee.feeData = data
    return data
}

module.exports = { getFeeBitget };