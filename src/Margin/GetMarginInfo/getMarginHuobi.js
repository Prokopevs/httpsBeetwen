require('dotenv').config({path:__dirname+'/../../.env'})

const { signRequestMarginHuobi } = require('../MarginRequests/huobiMarginRequest')
let { huobiMargin } = require('../marginData')

const apiKeyHuobi = process.env.apiKeyHuobi
const apiSecretHuobi = process.env.apiSecretHuobi

const getMarginHuobi = async () => {
    const res = await signRequestMarginHuobi('GET', '/v1/margin/loan-info', {}, 'https://api.huobi.pro', apiKeyHuobi, apiSecretHuobi) 

    const data = res.data.data
    for(let i=0; i<data.length; i++) {
        data[i].symbol = data[i].symbol.toUpperCase()
        data[i].cross = false
        data[i].isolated = true
    }
    huobiMargin.marginData = data
}

module.exports = { getMarginHuobi };