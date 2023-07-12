const { preBuyArr } = require("../Data")

const urlsArr = []

const fetchOrderBook = () => {
    const binanceFetch = 'https://api.binance.com/api/v3/depth?symbol='
    const mexcFetch = 'https://api.mexc.com/api/v3/depth?symbol='

    for(let i=0; i<preBuyArr.data.length; i++) {
        const coinObj = preBuyArr.data[i]

        if(i==6) break
        if(coinObj.buyFrom === 'binance') createUrl(binanceFetch, coinObj.symbol) // обязательно с начала buyFrom
        if(coinObj.buyFrom === 'mexc') createUrl(mexcFetch, coinObj.symbol)

        if(coinObj.sellTo === 'binance') createUrl(binanceFetch, coinObj.symbol)
        if(coinObj.sellTo === 'mexc') createUrl(mexcFetch, coinObj.symbol)

        preBuyArr.data.splice(i, 1)
        i--
    }
    console.log(urlsArr)

    let requests = urlsArr.map((url) => fetch(url).then((response) => response.json()))

    Promise.all(requests)
        .then(results => { 
            results.forEach((result, num) => {
                console.log(result)
            })

        }) 

}

const createUrl = (url, symbol) => {
    const finalUrl = url+symbol+'&limit=40'
    urlsArr.push(finalUrl)
} 


module.exports = { fetchOrderBook }