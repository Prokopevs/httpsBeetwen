const { compareAsksAndBids } = require("./compareAsksAndBids")


const fetchOrderBook = (preBuyArr) => {
    const urlsArr = []
    const requestedCoinsArr = []
    const binanceFetch = 'https://api.binance.com/api/v3/depth?symbol='
    const mexcFetch = 'https://api.mexc.com/api/v3/depth?symbol='

    let count = 0

    for(let i=0; i<preBuyArr.length; i++) {
        const coinObj = preBuyArr[i]

        if(count == 4) {
            console.log('break')
            break
        }
        if(coinObj.buyFrom === 'binance') createUrl(binanceFetch, coinObj.symbol, urlsArr) // обязательно с начала buyFrom
        if(coinObj.buyFrom === 'mexc') createUrl(mexcFetch, coinObj.symbol, urlsArr)

        if(coinObj.sellTo === 'binance') createUrl(binanceFetch, coinObj.symbol, urlsArr)
        if(coinObj.sellTo === 'mexc') createUrl(mexcFetch, coinObj.symbol, urlsArr)

        requestedCoinsArr.push(coinObj)
        preBuyArr.splice(i, 1)
        i--

        count++
    }

    let requests = urlsArr.map((url) => fetch(url).then((response) => response.json()))

    Promise.all(requests)
        .then(results => { 
            compareAsksAndBids(results, requestedCoinsArr)
            console.log(results.length, requestedCoinsArr.length)
        }) 
    
    if(preBuyArr.length) {
        setTimeout(fetchOrderBook, 1100, preBuyArr)
    }
}

const createUrl = (url, symbol, urlsArr) => {
    const finalUrl = url+symbol+'&limit=40'
    urlsArr.push(finalUrl)
} 


module.exports = { fetchOrderBook }