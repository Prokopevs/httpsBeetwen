const { requestFlag } = require("../Data")
const { getOrderBookCoinbase } = require("../ExtraInfo/GetExchangeInfo/getExchangeInfoCoinbase")
const { compareAsksAndBids } = require("./compareAsksAndBids")

const fetchOrderBook = async (preBuyArr, status) => {
    console.log(preBuyArr.length)
    const urlsArr = []
    const requestedCoinsArr = []
    const binanceFetch = 'https://api.binance.com/api/v3/depth?symbol='
    const mexcFetch = 'https://api.mexc.com/api/v3/depth?symbol='
    const bybitFetch = 'https://api.bybit.com/v5/market/orderbook?category=spot&symbol='
    const gateIoFetch = 'https://api.gateio.ws/api/v4/spot/order_book?currency_pair='
    const lbankFetch = 'https://api.lbkex.com/v2/depth.do?symbol='
    const kucoinFetch = 'https://api.kucoin.com/api/v1/market/orderbook/level2_100?symbol='
    const okxFetch = 'https://www.okx.cab/api/v5/market/books?instId='
    const bitgetFetch = 'https://api.bitget.com/api/spot/v1/market/depth?symbol='
    const huobiFetch = 'https://api.huobi.pro/market/depth?symbol='
    const poloniexFetch = 'https://api.poloniex.com/markets/'
    const bitmartFetch = 'https://api-cloud.bitmart.com/spot/v1/symbols/book?symbol='

    let count = 0
    const arrForCoinbase = []
    //-------------------подготавливаем строки для запроса----------------------------------------//
    const createUrl = (url, symbol, limit) => {
        let finalUrl = url+symbol+`&${limit}=40`
        if(limit === 'kucoin') finalUrl = url+symbol
        if(limit === 'huobi') finalUrl = url+symbol+'&type=step0'
        if(limit === 'poloniex') finalUrl = url+symbol+'/orderBook?limit=50'
        
        

        urlsArr.push(finalUrl)
    }

    for(let i=0; i<preBuyArr.length; i++) {
        const coinObj = preBuyArr[i]

        if(count == 12) {
            break
        }
        if(coinObj.buyFrom === 'binance') createUrl(binanceFetch, coinObj.symbol, 'limit') // обязательно с начала buyFrom
        if(coinObj.buyFrom === 'mexc') createUrl(mexcFetch, coinObj.symbol, 'limit')
        if(coinObj.buyFrom === 'bybit') createUrl(bybitFetch, coinObj.symbol, 'limit')
        if(coinObj.buyFrom === 'gateIo') createUrl(gateIoFetch, coinObj.baseAsset+'_'+coinObj.quoteAsset, 'limit')
        if(coinObj.buyFrom === 'coinbase') arrForCoinbase.push({req: getOrderBookCoinbase(coinObj.originalCoinbaseSymbol, 40), index: urlsArr.length})
        if(coinObj.buyFrom === 'lbank') createUrl(lbankFetch, coinObj.baseAsset.toLowerCase()+'_'+coinObj.quoteAsset.toLowerCase(), 'size')
        if(coinObj.buyFrom === 'kucoin') createUrl(kucoinFetch, coinObj.baseAsset+'-'+coinObj.quoteAsset, 'kucoin')
        if(coinObj.buyFrom === 'okx') createUrl(okxFetch, coinObj.baseAsset+'-'+coinObj.quoteAsset, 'sz')
        if(coinObj.buyFrom === 'bitget') createUrl(bitgetFetch, coinObj.symbol+'_SPBL', 'limit')
        if(coinObj.buyFrom === 'huobi') createUrl(huobiFetch, coinObj.symbol.toLowerCase(), 'huobi')
        if(coinObj.buyFrom === 'poloniex') createUrl(poloniexFetch, coinObj.baseAsset+'_'+coinObj.quoteAsset, 'poloniex')
        if(coinObj.buyFrom === 'bitmart') createUrl(bitmartFetch, coinObj.baseAsset+'_'+coinObj.quoteAsset, 'size')
        

        if(coinObj.sellTo === 'binance') createUrl(binanceFetch, coinObj.symbol, 'limit')
        if(coinObj.sellTo === 'mexc') createUrl(mexcFetch, coinObj.symbol, 'limit')
        if(coinObj.sellTo === 'bybit') createUrl(bybitFetch, coinObj.symbol, 'limit')
        if(coinObj.sellTo === 'gateIo') createUrl(gateIoFetch, coinObj.baseAsset+'_'+coinObj.quoteAsset, 'limit')
        if(coinObj.sellTo === 'coinbase') arrForCoinbase.push({req: getOrderBookCoinbase(coinObj.originalCoinbaseSymbol, 40), index: urlsArr.length}) 
        if(coinObj.sellTo === 'lbank') createUrl(lbankFetch, coinObj.baseAsset.toLowerCase()+'_'+coinObj.quoteAsset.toLowerCase(), 'size')
        if(coinObj.sellTo === 'kucoin') createUrl(kucoinFetch, coinObj.baseAsset+'-'+coinObj.quoteAsset, 'kucoin')
        if(coinObj.sellTo === 'okx') createUrl(okxFetch, coinObj.baseAsset+'-'+coinObj.quoteAsset, 'sz')
        if(coinObj.sellTo === 'bitget') createUrl(bitgetFetch, coinObj.symbol+'_SPBL', 'limit')
        if(coinObj.sellTo === 'huobi') createUrl(huobiFetch, coinObj.symbol.toLowerCase(), 'huobi')
        if(coinObj.sellTo === 'poloniex') createUrl(poloniexFetch, coinObj.baseAsset+'_'+coinObj.quoteAsset, 'poloniex')
        if(coinObj.sellTo === 'bitmart') createUrl(bitmartFetch, coinObj.baseAsset+'_'+coinObj.quoteAsset, 'size')

        requestedCoinsArr.push(coinObj)  // пушим в массив те монеты, на которые сделаем запрос
        preBuyArr.splice(i, 1)
        i--

        count++
    }
    
    //-------------------------------------------------------------

    //------------------------делаем запрос-----------------------
    let requests = urlsArr.map((url) => fetch(url).then((response) => response.json()))
    for(let i=0; i<arrForCoinbase.length; i++) {
        requests.splice(arrForCoinbase[i].index+i, 0, arrForCoinbase[i].req)
    }

    if(status === 'refetch') {
        let result 
        await Promise.all(requests)
        .then(results => { 
            const newResult = combineOrderBooks(results, requestedCoinsArr)
            result = compareAsksAndBids(newResult, requestedCoinsArr, status)
        }) 
        .catch(error => {
            console.log(error)
        }) 
        return result
    } else {
        Promise.all(requests)
        .then(results => { 
            const newResult = combineOrderBooks(results, requestedCoinsArr)
            compareAsksAndBids(newResult, requestedCoinsArr, status)
        }) 
        .catch(error => {
            console.log(error)
        }) 
    }
    
    // если элементы в массиве остались, то через 1000 запрашиваем снова
    if(preBuyArr.length) {
        setTimeout(fetchOrderBook, 1000, preBuyArr, 'ordinary')
    } else {
        requestFlag.data = true
    }
    //-------------------------------------------------------------
}


const combineOrderBooks = (orderBooks, requestedCoinsArr) => {
    let count = 0
    const finallArr = []
    for(let i=0; i<requestedCoinsArr.length; i++) {
        const arr = []

        const buyFrom = requestedCoinsArr[i].buyFrom
        const sellTo = requestedCoinsArr[i].sellTo

        //------------------------------//
        if(buyFrom=='bybit') {
            createCorrectOrderBook(orderBooks[count], 'bybit', arr)
        } else if(buyFrom=='lbank') {
            createCorrectOrderBook(orderBooks[count], 'lbank', arr)
        } else if(buyFrom=='kucoin') {
            createCorrectOrderBook(orderBooks[count], 'kucoin', arr)
        } else if(buyFrom=='okx') {
            createCorrectOrderBook(orderBooks[count], 'okx', arr)
        } else if(buyFrom=='bitget') {
            createCorrectOrderBook(orderBooks[count], 'bitget', arr)
        } else if(buyFrom=='huobi') {
            createCorrectOrderBook(orderBooks[count], 'huobi', arr)
        } else if(buyFrom=='poloniex') {
            createCorrectOrderBook(orderBooks[count], 'poloniex', arr)
        } else if(buyFrom=='bitmart') {
            createCorrectOrderBook(orderBooks[count], 'bitmart', arr)
        } else {
            arr.push(orderBooks[count])
        }

        if(sellTo=='bybit') {
            createCorrectOrderBook(orderBooks[count+1], 'bybit', arr)
        } else if(sellTo=='lbank') {
            createCorrectOrderBook(orderBooks[count+1], 'lbank', arr)
        } else if(sellTo=='kucoin') {
            createCorrectOrderBook(orderBooks[count+1], 'kucoin', arr)
        } else if(sellTo=='okx') {
            createCorrectOrderBook(orderBooks[count+1], 'okx', arr)
        } else if(sellTo=='bitget') {
            createCorrectOrderBook(orderBooks[count+1], 'bitget', arr)
        } else if(sellTo=='huobi') {
            createCorrectOrderBook(orderBooks[count+1], 'huobi', arr)
        } else if(sellTo=='poloniex') {
            createCorrectOrderBook(orderBooks[count+1], 'poloniex', arr)
        } else if(sellTo=='bitmart') {
            createCorrectOrderBook(orderBooks[count+1], 'bitmart', arr)
        } else {
            arr.push(orderBooks[count+1])
        }

        count += 2
        finallArr.push(arr)
    }
    return finallArr
}

const createCorrectOrderBook = (book, exchangeName, arr) => {
    if(exchangeName == 'bybit') {
        book.result.asks = book.result.a
        book.result.bids = book.result.b
        arr.push(book.result)
    }
    if(exchangeName == 'lbank') {
        arr.push(book.data)
    }
    if(exchangeName == 'kucoin') {
        const data = book.data
        data.bids = data.bids.slice(0, 40)
        data.asks = data.asks.slice(0, 40)
        arr.push(data)
    }
    if(exchangeName == 'okx') {
        arr.push(book.data[0])
    }
    if(exchangeName == 'bitget') {
        arr.push(book.data)
    }
    if(exchangeName == 'huobi') {
        const data = book.tick
        data.bids = data.bids.slice(0, 40)
        data.asks = data.asks.slice(0, 40)
        arr.push(data)
    }
    if(exchangeName == 'poloniex') {
        const asks = []
        const bids = []
        for (let i=0; i<book.asks.length; i+= 2) {
            asks.push([book.asks[i], book.asks[i + 1]])
        }
        for (let i=0; i<book.bids.length; i+= 2) {
            bids.push([book.bids[i], book.bids[i + 1]])
        }
        book.asks = asks.slice(0, 40)
        book.bids = bids.slice(0, 40)
        arr.push(book)
    }       
    if(exchangeName == 'bitmart') {     
        const dataBuy = book.data.buys
        const dataSell = book.data.sells
        const asks = []
        const bids = []
        for (let i=0; i<dataSell.length; i++) {
            asks.push([dataSell[i].price, Number(dataSell[i].amount).toString()])
        }
        for (let i=0; i<dataBuy.length; i++) {
            bids.push([dataBuy[i].price, Number(dataBuy[i].amount).toString()])
        }
        const objData = {
            asks: asks,
            bids: bids
        }
        arr.push(objData)
    }   
}

exports.fetchOrderBook = fetchOrderBook
