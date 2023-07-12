let urlsArr = [
    'https://api.binance.com/api/v3/ticker/bookTicker',
    'https://api.mexc.com/api/v3/ticker/bookTicker'
]

let allCoins = {data: []}
let mainData = {data: []}

let oldMilkyArr = []
let currentMilkyArr = []

let preBuyArr = {data: []}

module.exports = { urlsArr, oldMilkyArr, currentMilkyArr, allCoins, mainData, preBuyArr}