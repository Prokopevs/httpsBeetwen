let { huobiExchangeInfo } = require('../ExchangeData')
const axios = require("axios")

const getExchangeInfoHuobi = async () => {
    const urlsArr = ['https://api.huobi.pro/v2/settings/common/symbols', 'https://api.huobi.pro/v2/settings/common/currencies']
    let arrRequest = urlsArr.map((url) => fetch(url).then((response) => response.json()))

    let data
    let currencies
    await Promise.all(arrRequest)
    .then(results => { 
        data = results[0].data
        currencies = results[1].data
    })

    for(let i=0; i<data.length; i++) {
        const fullName = currencies.find((item) => item.cc === data[i].bc)
        if(fullName) {
            data[i].name = fullName.fn.toLowerCase()
        }
        data[i].symbol = data[i].sc.toUpperCase()
        data[i].baseAsset = data[i].bcdn
        data[i].quoteAsset = data[i].qcdn
    }

    huobiExchangeInfo.exchangeData = [...data]
    return huobiExchangeInfo.exchangeData
}

module.exports = { getExchangeInfoHuobi };