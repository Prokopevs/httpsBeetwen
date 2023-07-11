require('dotenv').config({path:__dirname+'/../../.env'})
let { signRequest } = require('../universalFeeRequest')

const apiKeyMexc = process.env.APIKEYMEXC
const apiSecretMexc = process.env.APISECRETMEXC

const getFeeMexc = async () => {
    const result = await signRequest('GET', '/api/v3/capital/config/getall', {}, 'https://api.mexc.com', 'X-MEXC-APIKEY', apiKeyMexc, apiSecretMexc)

    console.log(result.data)
    return result.data
}

module.exports = { getFeeMexc };


