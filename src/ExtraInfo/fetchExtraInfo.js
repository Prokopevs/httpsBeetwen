let { urlArray } = require('./ExchangeData')
let { binanceExchangeInfo, mexcExchangeInfo } = require('./ExchangeData')

const fetchExtraInfo = async() => {
    console.log('запрос на ExchangeInfo...')
    let requests = urlArray.map((url) => fetch(url).then((response) => response.json()))
    await Promise.all(requests)
        .then(results => { 
            results.forEach((result, num) => {
                const data = result.symbols
                if(num === 0) binanceExchangeInfo.exchangeData = [...data]
                if(num === 1) mexcExchangeInfo.exchangeData = [...data]
            })
        })
}

module.exports = { fetchExtraInfo };
