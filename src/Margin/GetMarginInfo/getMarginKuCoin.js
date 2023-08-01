require('dotenv').config({path:__dirname+'/../../.env'})

const { signRequestMarginKuCoin } = require('../MarginRequests/kucoinMarginRequest')
let { kucoinMargin } = require('../marginData')

const apiKeyKuCoin = process.env.apiKeyKuCoin
const apiSecretKuCoin = process.env.apiSecretKuCoin
const apiPassphraseKuCoin = process.env.apiPassphraseKuCoin

const getMarginKuCoin = async () => {
    const res = await signRequestMarginKuCoin('GET', '/api/v1/isolated/symbols', {}, 'https://api.kucoin.com', apiKeyKuCoin, apiSecretKuCoin, apiPassphraseKuCoin)
    const data = res.data.data
    for(let i=0; i<data.length; i++) {
        data[i].symbol = data[i].symbol.replace(/-/g, "")
        data[i].cross = true
        data[i].isolated = true
    }
    kucoinMargin.marginData = data
}

module.exports = { getMarginKuCoin };