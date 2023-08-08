const axios = require("axios")
let { huobiFee } = require('../feeData')

const getFeeHuobi = async () => {
    const result = await axios.get('https://api.huobi.pro/v2/reference/currencies')
    const data = result.data.data
    
    for(let i=0; i<data.length; i++) {
        data[i].coin = data[i].currency.toUpperCase()
        const chains = data[i].chains
        for(let j=0; j<chains.length; j++) {
            const networkArr = [chains[j].displayName, chains[j].baseChainProtocol, chains[j].baseChain]
            const uniqNetwork = [...new Set(networkArr)];
            chains[j].withdrawFee = chains[j].transactFeeWithdraw ? chains[j].transactFeeWithdraw : 0
            chains[j].network = uniqNetwork.join('/')
            chains[j].depositStatus = chains[j].depositStatus === 'allowed' ? true : false
            chains[j].withdrawStatus =  chains[j].withdrawStatus === 'allowed' ? true : false
        }
    }
    huobiFee.feeData = data
    return data
}

module.exports = { getFeeHuobi };