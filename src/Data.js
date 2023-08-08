let urlsArr = [
    'https://api.binance.com/api/v3/ticker/bookTicker',
    'https://api.mexc.com/api/v3/ticker/bookTicker',
    'https://api.bybit.com/v5/market/tickers?category=spot',
    'https://api.gateio.ws/api/v4/spot/tickers',
    'https://api.huobi.pro/market/tickers', // убрать эту строчку когда подрубим coinbase 
    'https://api.lbkex.com/v2/supplement/ticker/price.do',
    'https://api.kucoin.com/api/v1/market/allTickers',
    'https://www.okx.cab/api/v5/market/tickers?instType=SPOT',
    'https://api.bitget.com/api/spot/v1/market/tickers',
    'https://api.huobi.pro/market/tickers',
]

let allCoins = {data: []}
let mainData = {data: []}

let oldMilkyArr = []
let currentMilkyArr = []
let requestFlag = {data: true}

const superBlackArr = ['PLTUSDT_bybit_mexc', 'HEROUSDT_mexc_bybit', 'DFIUSDT_mexc_bybit', 'MCTUSDT_mexc_bybit', 'GMTUSDT_mexc_bybit', 'GMTUSDT_mexc_binance', 'GASUSDT_mexc_binance', 'QIUSDT_binance_mexc', 'MDTUSDT_mexc_binance', 'ETERNALUSDT_mexc_gateIo', 'FNFUSDT_gateIo_mexc', 'LSDUSDT_mexc_gateIo', 'DOT5SUSDT_mexc_gateIo', 'PIZAUSDT_gateIo_mexc', 'WOMUSDT_gateIo_mexc', 'BFTUSDT_gateIo_mexc', 'WNZUSDT_gateIo_mexc', 'QWANUSDT_mexc_gateIo', 'RFTUSDT_mexc_gateIo', 'GASUSDT_mexc_gateIo', 'BIFIUSDT_gateIo_binance', 'GMTUSDT_mexc_gateIo', 'QIUSDT_binance_gateIo', 'MLNUSDT_gateIo_mexc', 'SNFTUSDT_gateIo_mexc', 'AIEUSDT_gateIo_mexc', 'DRACUSDT_gateIo_mexc', 'ASMUSDT_gateIo_mexc', 'KINGUSDT_mexc_gateIo', 'MDTUSDT_mexc_gateIo', 'WNXMUSDT_gateIo_binance', 'WNXMUSDT_gateIo_mexc', 'GTCUSDT_gateIo_binance', 'GTCUSDT_gateIo_mexc', 'ORTUSDT_mexc_gateIo', 'ASTROUSDT_gateIo_mexc', 'TEDDYUSDT_mexc_gateIo', 'REVOUSDT_gateIo_mexc', 'JAMUSDT_mexc_gateIo', 'BASUSDT_mexc_gateIo', 'ORTUSDT_bybit_gateIo', 'CHAMPUSDT_gateIo_mexc', 'IMPTUSDT_mexc_gateIo', 'STARUSDT_gateIo_mexc', 'FREEUSDT_gateIo_mexc', 'SOULUSDT_mexc_gateIo', 'FBXUSDT_mexc_gateIo', 'CRTUSDT_mexc_gateIo', 'HEROUSDT_mexc_gateIo', 'NOOTUSDT_mexc_gateIo', 'PAWUSDT_gateIo_mexc', 'MMMUSDT_gateIo_mexc', 'WHALEUSDT_mexc_gateIo', 'PLCUUSDT_gateIo_mexc', 'RICEUSDT_mexc_gateIo', 'SOVUSDT_mexc_gateIo', 'DFIUSDT_mexc_gateIo', 'DISUSDT_mexc_gateIo', 'REDUSDT_mexc_gateIo', 'REALUSDT_gateIo_mexc', 'REALUSDT_gateIo_bybit', 'RAMUSDT_gateIo_mexc', 'AXLUSDT_gateIo_bybit', 'TIMEUSDT_bybit_gateIo', 'GTCBTC_gateIo_binance', 'MDTUSDT_mexc_coinbase', 'GTCUSDT_gateIo_coinbase', 'QIUSDT_coinbase_gateIo', 'GMTUSDT_mexc_coinbase', 'TIMEUSDT_coinbase_gateIo', 'FAMEUSDT_bybit_gateIo', 'AXLUSDT_gateIo_coinbase', 'ASMUSDT_coinbase_mexc', 'TRACUSDT_coinbase_gateIo', 'QIUSDT_coinbase_mexc', 'QUICKUSDT_gateIo_coinbase', 'ARBUSD_coinbase_binance', 'USDTUSD_gateIo_coinbase', 'VMPXUSDT_mexc_gateIo', 'BBCUSDT_mexc_gateIo', 'SAITAMAUSDT_gateIo_mexc', 'PORUSDT_lbank_gateIo', 'PORUSDT_lbank_mexc', 'XPRUSDT_lbank_gateIo', 'XPRUSDT_lbank_mexc', 'VRTUSDT_gateIo_lbank', 'VRTUSDT_mexc_lbank', 'CREUSDT_gateIo_lbank', 'CREUSDT_mexc_lbank', 'MNTUSDT_gateIo_mexc', 'MNTUSDT_gateIo_bybit', 'LIFEUSDT_gateIo_lbank', 'LIFEUSDT_mexc_lbank', 'KABOSUUSDT_lbank_mexc', 'GTCUSDT_gateIo_lbank', 'QIUSDT_lbank_mexc', 'QIUSDT_lbank_gateIo', 'IMPTUSDT_mexc_lbank', 'HEROUSDT_mexc_lbank', 'PAWUSDT_gateIo_lbank', 'EVAUSDT_gateIo_lbank', 'ESGUSDT_lbank_gateIo', 'VMPXUSDT_lbank_gateIo', 'DBCUSDT_gateIo_lbank', 'MURATIAIUSDT_gateIo_mexc', 'MAXUSDT_mexc_lbank', 'BBCUSDT_mexc_kucoin', 'XPRUSDT_lbank_kucoin', 'XPRUSDT_lbank_kucoin', 'GMTUSDT_mexc_kucoin', 'GTCUSDT_gateIo_kucoin', 'HEROUSDT_mexc_kucoin', 'GEMUSDT_gateIo_kucoin', 'XBOTUSDT_mexc_lbank','PSYOPUSDT_mexc_lbank', 'WSBUSDT_lbank_okx', 'WSBUSDT_gateIo_okx', 'WSBUSDT_mexc_okx', 'XPRUSDT_lbank_okx', 'GMTUSDT_mexc_okx', 'PORUSDT_lbank_okx', 'GASUSDT_mexc_okx', 'MDTUSDT_mexc_okx', 'HALOUSDT_bitget_lbank', 'HALOUSDT_kucoin_lbank', 'TRACUSDT_kucoin_gateIo', 'REDUSDT_bitget_gateIo', 'REDUSDT_kucoin_gateIo', 'WSBUSDT_bitget_okx', 'VMPXUSDT_lbank_bitget', 'VMPXUSDT_mexc_bitget', 'PAWUSDT_bitget_lbank', 'PAWUSDT_bitget_mexc', 'FREEUSDT_bitget_mexc', 'XUSDT_lbank_bitget', 'XUSDT_mexc_bitget', 'XPRUSDT_lbank_bitget', 'AIUSDT_mexc_bitget', 'LSDUSDT_bitget_gateIo', 'GMTUSDT_mexc_bitget', 'MCUSDT_kucoin_lbank', 'MCUSDT_kucoin_gateIo', 'MCUSDT_kucoin_mexc', 'MCUSDT_kucoin_binance', 'GTCUSDT_gateIo_bitget', 'REVOUSDT_gateIo_huobi', 'BBCUSDT_mexc_huobi', 'TAOUSDT_huobi_bitget', 'TAOUSDT_huobi_mexc', 'DYPUSDT_huobi_kucoin', 'DYPUSDT_gateIo_kucoin', 'DYPUSDT_mexc_kucoin', 'MCUSDT_kucoin_huobi', 'LOVEUSDT_huobi_lbank', 'LOVEUSDT_huobi_mexc', 'DBCUSDT_huobi_lbank', ]
let temporary5minBlackArr =  {data: []}
const fiatFilter = ['EUR', 'GBP', 'RUB']

module.exports = { urlsArr, oldMilkyArr, currentMilkyArr, requestFlag, allCoins, mainData, superBlackArr, temporary5minBlackArr, fiatFilter}