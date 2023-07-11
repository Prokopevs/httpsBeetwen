let binanceExchangeInfo = {exchangeData: []}
let mexcExchangeInfo = {exchangeData: []}

let urlArray = [
    'https://api.binance.com/api/v3/exchangeInfo',
    'https://api.mexc.com/api/v3/exchangeInfo'
]

module.exports = { binanceExchangeInfo, mexcExchangeInfo, urlArray}
