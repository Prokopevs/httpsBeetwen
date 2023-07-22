require('dotenv').config({path:__dirname+'/../../.env'})
let { signRequest } = require('../feeRequest/universalFeeRequest')
let { binanceFee } = require('../feeData')

const apiKeyBinance = process.env.APIKEYBINANCE
const apiSecretBinance = process.env.APISECRETBINANCE

const getFeeBinance = async () => {
    const result = await signRequest('GET', '/sapi/v1/capital/config/getall', {}, 'https://api.binance.com', 'X-MBX-APIKEY', apiKeyBinance, apiSecretBinance)
    const data = result.data
    binanceFee.feeData = data

    return data
}

module.exports = { getFeeBinance };


