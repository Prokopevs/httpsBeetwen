require('dotenv').config({path:__dirname+'/../../.env'})
let { signRequest } = require('../universalFeeRequest')

const apiKeyBinance = process.env.APIKEYBINANCE
const apiSecretBinance = process.env.APISECRETBINANCE

const getFeeBinance = async () => {
    const result = await signRequest('GET', '/sapi/v1/capital/config/getall', {}, 'https://api.binance.com', 'X-MBX-APIKEY', apiKeyBinance, apiSecretBinance)
    return result.data
}

module.exports = { getFeeBinance };


