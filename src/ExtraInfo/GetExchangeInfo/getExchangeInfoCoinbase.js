require('dotenv').config({path:__dirname+'/../../.env'})
const axios = require("axios")
const crypto = require('crypto')
let { coinbaseExchangeInfo } = require('../ExchangeData')
const apiKeyCoinbase = process.env.apiKeyCoinbase
const apiSecretCoinbase = process.env.apiSecretCoinbase
 
const getRequestInstance = (config) => { 
    return axios.create({ 
      ...config 
    }) 
} 
 
const createRequest = (config) => { 
    const { baseURL, method, url, apiKey, signature, timestamp } = config 
    return getRequestInstance({ 
      baseURL, 
      headers: { 
        'CB-ACCESS-SIGN': signature, 
        'CB-ACCESS-TIMESTAMP': timestamp, 
        'CB-ACCESS-KEY': apiKey, 
      } 
    }).request({ 
      method, 
      url 
    }) 
} 
 
const signRequestCoinbase = (method, path, params, baseURL, apiKey, apiSecret) => { 
    const timestamp = Math.floor(Date.now() / 1000).toString() 
    const body = '' 
    const queryString = timestamp + method + path + body 
 
    let signature = crypto.createHmac("sha256", apiSecret).update(queryString).digest("hex"); 
    signature = signature.toString() 
     
    return createRequest({ 
      baseURL, 
      method, 
      url: path + params, 
      apiKey: apiKey, 
      signature: signature, 
      timestamp: timestamp 
    }) 
} 
// + '?product_id=PRQ-USD&limit=10' 
 
const getExchangeInfoCoinbase = async () => {  //exchangeInfo
    const res = await signRequestCoinbase('GET', '/api/v3/brokerage/products', '', 'https://api.coinbase.com', apiKeyCoinbase, apiSecretCoinbase) 
    let data = res.data.products
    for(let i=0; i<data.length; i++) {
        if(data[i].quote_currency_id === 'USDC') {
            data[i].symbol = data[i].base_currency_id + 'USDT'
            data[i].quoteAsset = 'USDT'
        } else {
            data[i].symbol = data[i].base_currency_id + data[i].quote_currency_id
            data[i].quoteAsset = data[i].quote_currency_id
        }
        data[i].baseAsset = data[i].base_currency_id
        data[i].originalSymbol = data[i].product_id
        data[i].name = data[i].base_name.toLowerCase()
    }

    coinbaseExchangeInfo.exchangeData = [...data]
    return coinbaseExchangeInfo.exchangeData
}


const getBestBidsAsksCoinbase = async () => { // Ticker
    const res = await signRequestCoinbase('GET', '/api/v3/brokerage/best_bid_ask', '', 'https://api.coinbase.com', apiKeyCoinbase, apiSecretCoinbase) 
    return res.data.pricebooks
}

const getOrderBookCoinbase = async (symbol, limit) => { // orderBook
        const res = await signRequestCoinbase('GET', '/api/v3/brokerage/product_book', `?product_id=${symbol}&limit=${limit}`, 'https://api.coinbase.com', apiKeyCoinbase, apiSecretCoinbase) 
        const data = res.data.pricebook
        const bidsArrRes = data.bids
        const asksArrRes = data.asks

        const orderBook = {bids:[], asks: []}
        const bidsArr = []
        const asksArr = []
        for(let i=0; i<bidsArrRes.length; i++) {
            const onebid = []
            onebid.push(bidsArrRes[i].price)
            onebid.push(bidsArrRes[i].size)

            const oneask = []
            oneask.push(asksArrRes[i].price)
            oneask.push(asksArrRes[i].size)

            bidsArr.push(onebid)
            asksArr.push(oneask)
        }

        orderBook.bids.push(...bidsArr)
        orderBook.asks.push(...asksArr)

        return orderBook
    } 
    


module.exports = { getExchangeInfoCoinbase, getBestBidsAsksCoinbase, getOrderBookCoinbase};
