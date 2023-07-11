require('dotenv').config({path:__dirname+'/../../.env'})
let { signRequest } = require('../universalFeeRequest')

const apiKeyBinance = process.env.APIKEYBINANCE
const apiSecretBinance = process.env.APISECRETBINANCE
console.log(apiKeyBinance)

const getFeeBinance = async () => {
    const result = await signRequest('GET', '/sapi/v1/margin/isolated/allPairs', {}, 'https://api.binance.com', 'X-MBX-APIKEY', apiKeyBinance, apiSecretBinance)

    console.log(result)
    return result
}

module.exports = { getFeeBinance };


