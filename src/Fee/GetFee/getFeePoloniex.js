const axios = require("axios")
let { poloniexFee } = require('../feeData')

const getFeePoloniex = async () => {
    const result = await axios.get('https://api.poloniex.com/v2/currencies')
    const data = result.data
    for(let i=0; i<data.length; i++) {
        const networkList = data[i].networkList
        for(let j=0; j<networkList.length; j++) {
            if(networkList[j].blockchain === "ETH") networkList[j].blockchain = networkList[j].blockchain+'/'+'ERC20'
            if(networkList[j].blockchain === "BSC") networkList[j].blockchain = networkList[j].blockchain+'/'+'BEP20'
        }
    }
    poloniexFee.feeData = data
    return data
}

module.exports = { getFeePoloniex };