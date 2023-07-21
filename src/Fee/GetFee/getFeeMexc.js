require('dotenv').config({path:__dirname+'/../../.env'})
let { signRequest } = require('../feeRequest/universalFeeRequest')
let { mexcFee } = require('../feeData')

const apiKeyMexc = process.env.APIKEYMEXC
const apiSecretMexc = process.env.APISECRETMEXC

const getFeeMexc = async () => {
    const result = await signRequest('GET', '/api/v3/capital/config/getall', {}, 'https://api.mexc.com', 'X-MEXC-APIKEY', apiKeyMexc, apiSecretMexc)
    const data = result.data
    mexcFee.feeData = data
    return data
}

module.exports = { getFeeMexc };


