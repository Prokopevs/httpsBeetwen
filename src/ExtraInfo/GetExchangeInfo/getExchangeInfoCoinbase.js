require('dotenv').config({path:__dirname+'/../../.env'})
const axios = require("axios")
const crypto = require('crypto')
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
      url: path, 
      apiKey: apiKey, 
      signature: signature, 
      timestamp: timestamp 
    }) 
} 
// + '?product_id=PRQ-USD&limit=10' 
 
const getExchangeInfoCoinbase = async () => {
    const res = await signRequestCoinbase('GET', '/api/v3/brokerage/products', {}, 'https://api.coinbase.com', apiKeyCoinbase, apiSecretCoinbase) 
    let data = res.data.products
    for(let i=0; i<data.length; i++) {
        if(data[i].quote_currency_id === 'USDC') {
            data[i].symbol = data[i].base_currency_id + 'USDT'
        } else {
            data[i].symbol = data[i].base_currency_id + data[i].quote_currency_id
        }
        data[i].baseAsset = data[i].base_currency_id
        data[i].quoteAsset = data[i].quote_currency_id
        data[i].name = data[i].base_name
    }
    console.log(data)
}

module.exports = { getExchangeInfoCoinbase, signRequestCoinbase };
