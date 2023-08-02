const crypto = require('crypto')
const axios = require('axios')

const getRequestInstance = (config) => { 
    return axios.create({ 
      ...config 
    }) 
} 
 
const createRequest = (config) => { 
    const { baseURL, method, url, apiKey, signature, apiPassphrase, timestamp } = config 
    return getRequestInstance({ 
      baseURL, 
      headers: { 
        'OK-ACCESS-KEY': apiKey, 
        'OK-ACCESS-SIGN': signature, 
        'OK-ACCESS-TIMESTAMP': timestamp.toString(), 
        'OK-ACCESS-PASSPHRASE': apiPassphrase, 
      } 
    }).request({ 
      method, 
      url 
    }) 
} 
 
function sign(text, secret, outputType = 'base64') { 
    return crypto 
      .createHmac('sha256', secret) 
      .update(text) 
      .digest(outputType); 
} 
 
const signRequestOKX = async (method, path, params, baseURL, apiKey, apiSecret, apiPassphrase) => { 
    const timestamp = new Date().toISOString() 
    const signature = sign(timestamp + method + path, apiSecret); 
 
    return createRequest({ 
      baseURL, 
      method, 
      url: path, 
      apiKey: apiKey, 
      signature: signature, 
      apiPassphrase: apiPassphrase, 
      timestamp: timestamp 
    }) 
} 

module.exports = { signRequestOKX };