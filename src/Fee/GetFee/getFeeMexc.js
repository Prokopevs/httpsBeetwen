require('dotenv').config({path:__dirname+'/../../.env'})
let { signRequest } = require('../feeRequest/universalFeeRequest')
let { mexcFee, mexcNetworkObj } = require('../feeData')

const apiKeyMexc = process.env.APIKEYMEXC
const apiSecretMexc = process.env.APISECRETMEXC

const getFeeMexc = async () => {
    const result = await signRequest('GET', '/api/v3/capital/config/getall', {}, 'https://api.mexc.com', 'X-MEXC-APIKEY', apiKeyMexc, apiSecretMexc)
    
    const data = result.data

    for(let i=0; i<data.length; i++) {
        const networkList = data[i].networkList 
        for(let j=0; j<networkList.length; j++) {
            const network = networkList[j].network  //ERC20
            const newNetwork = mexcNetworkObj[network] ? mexcNetworkObj[network] : network
            networkList[j].network = newNetwork
        }
    }

    mexcFee.feeData = data
    return data
}

module.exports = { getFeeMexc };


