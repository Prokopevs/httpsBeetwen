require('dotenv').config({path:__dirname+'/../../.env'})
let { signRequest, publicRequest } = require('../MarginRequests/universalMarginRequest')
let { binanceMargin } = require('../marginData')

const apiKeyBinance = process.env.APIKEYBINANCE
const apiSecretBinance = process.env.APISECRETBINANCE

const getMarginBinance = async () => {
    let isolated
    let cross

    await Promise.all([
        signRequest('GET', '/sapi/v1/margin/isolated/allPairs', {}, 'https://api.binance.com', 'X-MBX-APIKEY', apiKeyBinance, apiSecretBinance),
        publicRequest('GET', '/sapi/v1/margin/allPairs', {}, 'https://api.binance.com', 'X-MBX-APIKEY', apiKeyBinance, apiSecretBinance)
    ]).then(results => { 
        isolated = results[0].data
        cross = results[1].data

        // проходимся по isolated и добавляем isolated: true также если это элемент есть в cross то добавляем cross: true и удаляем с cross
        for(let i=0; i<isolated.length; i++) { 
            isolated[i].isolated = true

            let elemInCross = cross.findIndex((elem) => elem.symbol === isolated[i].symbol)
            if(elemInCross !== -1) {
                isolated[i].cross = true
                cross.splice(elemInCross, 1)
            } else {
                isolated[i].cross = false
            }
        }

        // оставшиеся элементы с cross пушим в массив isolated 
        for(let i=0; i<cross.length; i++) {
            cross[i].isolated = false
            cross[i].cross = true
        }  
    })

    binanceMargin.marginData = [...isolated, ...cross]
}

module.exports = { getMarginBinance };


