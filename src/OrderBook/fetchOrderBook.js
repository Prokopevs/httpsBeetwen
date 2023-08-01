const { requestFlag } = require("../Data")
const { getOrderBookCoinbase } = require("../ExtraInfo/GetExchangeInfo/getExchangeInfoCoinbase")
const { compareAsksAndBids } = require("./compareAsksAndBids")

const fetchOrderBook = (preBuyArr) => {
    console.log(preBuyArr.length)
    const urlsArr = []
    const requestedCoinsArr = []
    const binanceFetch = 'https://api.binance.com/api/v3/depth?symbol='
    const mexcFetch = 'https://api.mexc.com/api/v3/depth?symbol='
    const bybitFetch = 'https://api.bybit.com/v5/market/orderbook?category=spot&symbol='
    const gateIoFetch = 'https://api.gateio.ws/api/v4/spot/order_book?currency_pair='
    const lbankFetch = 'https://api.lbkex.com/v2/depth.do?symbol='
    const kucoinFetch = 'https://api.kucoin.com/api/v1/market/orderbook/level2_100?symbol='

    let count = 0
    const arrForCoinbase = []
    //-------------------подготавливаем строки для запроса----------------------------------------//
    const createUrl = (url, symbol, limit) => {
        let finalUrl = url+symbol+`&${limit}=40`
        if(limit === 'kucoin') finalUrl = url+symbol
        urlsArr.push(finalUrl)
    }

    for(let i=0; i<preBuyArr.length; i++) {
        const coinObj = preBuyArr[i]

        if(count == 8) {
            break
        }
        if(coinObj.buyFrom === 'binance') createUrl(binanceFetch, coinObj.symbol, 'limit') // обязательно с начала buyFrom
        if(coinObj.buyFrom === 'mexc') createUrl(mexcFetch, coinObj.symbol, 'limit')
        if(coinObj.buyFrom === 'bybit') createUrl(bybitFetch, coinObj.symbol, 'limit')
        if(coinObj.buyFrom === 'gateIo') createUrl(gateIoFetch, coinObj.baseAsset+'_'+coinObj.quoteAsset, 'limit')
        if(coinObj.buyFrom === 'coinbase') arrForCoinbase.push({req: getOrderBookCoinbase(coinObj.originalCoinbaseSymbol, 40), index: urlsArr.length})
        if(coinObj.buyFrom === 'lbank') createUrl(lbankFetch, coinObj.baseAsset.toLowerCase()+'_'+coinObj.quoteAsset.toLowerCase(), 'size')
        if(coinObj.buyFrom === 'kucoin') createUrl(kucoinFetch, coinObj.baseAsset+'-'+coinObj.quoteAsset, 'kucoin')

        if(coinObj.sellTo === 'binance') createUrl(binanceFetch, coinObj.symbol, 'limit')
        if(coinObj.sellTo === 'mexc') createUrl(mexcFetch, coinObj.symbol, 'limit')
        if(coinObj.sellTo === 'bybit') createUrl(bybitFetch, coinObj.symbol, 'limit')
        if(coinObj.sellTo === 'gateIo') createUrl(gateIoFetch, coinObj.baseAsset+'_'+coinObj.quoteAsset, 'limit')
        if(coinObj.sellTo === 'coinbase') arrForCoinbase.push({req: getOrderBookCoinbase(coinObj.originalCoinbaseSymbol, 40), index: urlsArr.length}) 
        if(coinObj.sellTo === 'lbank') createUrl(lbankFetch, coinObj.baseAsset.toLowerCase()+'_'+coinObj.quoteAsset.toLowerCase(), 'size')
        if(coinObj.sellTo === 'kucoin') createUrl(kucoinFetch, coinObj.baseAsset+'-'+coinObj.quoteAsset, 'kucoin')

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


    Promise.all(requests)
        .then(results => { 
            const newResult = combineOrderBooks(results, requestedCoinsArr)
            compareAsksAndBids(newResult, requestedCoinsArr)
        }) 
    
    // если элементы в массиве остались, то через 1000 запрашиваем снова
    if(preBuyArr.length) {
        setTimeout(fetchOrderBook, 1000, preBuyArr)
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
        } else {
            arr.push(orderBooks[count])
        }

        if(sellTo=='bybit') {
            createCorrectOrderBook(orderBooks[count+1], 'bybit', arr)
        } else if(sellTo=='lbank') {
            createCorrectOrderBook(orderBooks[count+1], 'lbank', arr)
        } else if(sellTo=='kucoin') {
            createCorrectOrderBook(orderBooks[count+1], 'kucoin', arr)
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
}


module.exports = { fetchOrderBook }
