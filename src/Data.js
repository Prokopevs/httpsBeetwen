let urlsArr = [
    'https://api.binance.com/api/v3/ticker/bookTicker',
    'https://api.mexc.com/api/v3/ticker/bookTicker',
    'https://api.bybit.com/v5/market/tickers?category=spot',
    'https://api.gateio.ws/api/v4/spot/tickers',
]

let allCoins = {data: []}
let mainData = {data: []}

let oldMilkyArr = []
let currentMilkyArr = []
let requestFlag = {data: true}

let superBlackArr = ['PLTUSDT_bybit_mexc', 'HEROUSDT_mexc_bybit', 'DFIUSDT_mexc_bybit', 'MCTUSDT_mexc_bybit', 'GMTUSDT_mexc_bybit', 'GMTUSDT_mexc_binance', 'GASUSDT_mexc_binance', 'QIUSDT_binance_mexc', 'MDTUSDT_mexc_binance', 'ETERNALUSDT_mexc_gateIo', 'FNFUSDT_gateIo_mexc', 'LSDUSDT_mexc_gateIo', 'DOT5SUSDT_mexc_gateIo', 'PIZAUSDT_gateIo_mexc', 'WOMUSDT_gateIo_mexc', 'BFTUSDT_gateIo_mexc', 'WNZUSDT_gateIo_mexc', 'QWANUSDT_mexc_gateIo', 'RFTUSDT_mexc_gateIo', 'GASUSDT_mexc_gateIo', 'BIFIUSDT_gateIo_binance', 'GMTUSDT_mexc_gateIo', 'QIUSDT_binance_gateIo', 'MLNUSDT_gateIo_mexc', 'SNFTUSDT_gateIo_mexc', 'AIEUSDT_gateIo_mexc', 'DRACUSDT_gateIo_mexc', 'ASMUSDT_gateIo_mexc', 'KINGUSDT_mexc_gateIo', 'MDTUSDT_mexc_gateIo', 'WNXMUSDT_gateIo_binance', 'WNXMUSDT_gateIo_mexc', 'GTCUSDT_gateIo_binance', 'GTCUSDT_gateIo_mexc', 'ORTUSDT_mexc_gateIo', 'ASTROUSDT_gateIo_mexc', 'TEDDYUSDT_mexc_gateIo', 'REVOUSDT_gateIo_mexc', 'JAMUSDT_mexc_gateIo', 'BASUSDT_mexc_gateIo', 'ORTUSDT_bybit_gateIo', 'CHAMPUSDT_gateIo_mexc', 'IMPTUSDT_mexc_gateIo', 'STARUSDT_gateIo_mexc', 'FREEUSDT_gateIo_mexc', 'SOULUSDT_mexc_gateIo', 'FBXUSDT_mexc_gateIo', 'CRTUSDT_mexc_gateIo', 'HEROUSDT_mexc_gateIo', 'NOOTUSDT_mexc_gateIo', 'PAWUSDT_gateIo_mexc', 'MMMUSDT_gateIo_mexc', 'WHALEUSDT_mexc_gateIo', 'PLCUUSDT_gateIo_mexc', 'RICEUSDT_mexc_gateIo', 'SOVUSDT_mexc_gateIo', 'DFIUSDT_mexc_gateIo', 'DISUSDT_mexc_gateIo', 'REDUSDT_mexc_gateIo', 'REALUSDT_gateIo_mexc', 'REALUSDT_gateIo_bybit', 'RAMUSDT_gateIo_mexc', 'AXLUSDT_gateIo_bybit', 'TIMEUSDT_bybit_gateIo', 'GTCBTC_gateIo_binance', ]
let temporary5minBlackArr =  {data: []}

module.exports = { urlsArr, oldMilkyArr, currentMilkyArr, requestFlag, allCoins, mainData, superBlackArr, temporary5minBlackArr}