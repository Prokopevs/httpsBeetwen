const { requestFlag } = require("../Data")
const { compareAsksAndBids } = require("./compareAsksAndBids")

const fetchOrderBook = (preBuyArr) => {
    console.log(preBuyArr.length)
    const urlsArr = []
    const requestedCoinsArr = []
    const binanceFetch = 'https://api.binance.com/api/v3/depth?symbol='
    const mexcFetch = 'https://api.mexc.com/api/v3/depth?symbol='
    const bybitFetch = 'https://api.bybit.com/v5/market/orderbook?category=spot&symbol='
    const gateIoFetch = 'https://api.gateio.ws/api/v4/spot/order_book?currency_pair='

    let count = 0
    
    //-------------------подготавливаем строки для запроса----------------------------------------//
    const createUrl = (url, symbol, urlsArr) => {
        const finalUrl = url+symbol+'&limit=40'
        urlsArr.push(finalUrl)
    } 

    for(let i=0; i<preBuyArr.length; i++) {
        const coinObj = preBuyArr[i]

        if(count == 10) {
            break
        }
        if(coinObj.buyFrom === 'binance') createUrl(binanceFetch, coinObj.symbol, urlsArr) // обязательно с начала buyFrom
        if(coinObj.buyFrom === 'mexc') createUrl(mexcFetch, coinObj.symbol, urlsArr)
        if(coinObj.buyFrom === 'bybit') createUrl(bybitFetch, coinObj.symbol, urlsArr)
        if(coinObj.buyFrom === 'gateIo') createUrl(gateIoFetch, coinObj.baseAsset+'_'+coinObj.quoteAsset, urlsArr)

        if(coinObj.sellTo === 'binance') createUrl(binanceFetch, coinObj.symbol, urlsArr)
        if(coinObj.sellTo === 'mexc') createUrl(mexcFetch, coinObj.symbol, urlsArr)
        if(coinObj.sellTo === 'bybit') createUrl(bybitFetch, coinObj.symbol, urlsArr)
        if(coinObj.sellTo === 'gateIo') createUrl(gateIoFetch, coinObj.baseAsset+'_'+coinObj.quoteAsset, urlsArr)

        requestedCoinsArr.push(coinObj)  // пощим в массив те монеты, на которые сделаем запрос
        preBuyArr.splice(i, 1)
        i--

        count++
    }
    
    //-------------------------------------------------------------

    //------------------------делаем запрос-----------------------
    let requests = urlsArr.map((url) => fetch(url).then((response) => response.json()))
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
        } else {
            arr.push(orderBooks[count])
        }

        if(sellTo=='bybit') {
            createCorrectOrderBook(orderBooks[count+1], 'bybit', arr)
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
}


module.exports = { fetchOrderBook }
