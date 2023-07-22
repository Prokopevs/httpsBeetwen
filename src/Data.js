let urlsArr = [
    'https://api.binance.com/api/v3/ticker/bookTicker',
    'https://api.mexc.com/api/v3/ticker/bookTicker',
    'https://api.bybit.com/v5/market/tickers?category=spot'
]

let allCoins = {data: []}
let mainData = {data: []}

let oldMilkyArr = []
let currentMilkyArr = []

let superBlackArr = ['PLTUSDT_bybit_mexc', 'HEROUSDT_mexc_bybit', 'DFIUSDT_mexc_bybit', 'MCTUSDT_mexc_bybit', 'GMTUSDT_mexc_bybit', 'GMTUSDT_mexc_binance', 'GASUSDT_mexc_binance', 'QIUSDT_binance_mexc', 'MDTUSDT_mexc_binance']
let temporary5minBlackArr =  {data: []}

module.exports = { urlsArr, oldMilkyArr, currentMilkyArr, allCoins, mainData, superBlackArr, temporary5minBlackArr}