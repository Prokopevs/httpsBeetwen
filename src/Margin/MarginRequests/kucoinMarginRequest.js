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
        'KC-API-KEY': apiKey, 
        'KC-API-SIGN': signature, 
        'KC-API-TIMESTAMP': timestamp.toString(), 
        'KC-API-PASSPHRASE': apiPassphrase, 
        'Content-Type': 'application/json', 
        'User-Agent': `KuCoin-Node-SDK/${1}`, 
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
 
const signRequestMarginKuCoin = async (method, path, params, baseURL, apiKey, apiSecret, apiPassphrase) => { 
    const authVersion = 1 
    const timestamp = Date.now() 
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
  
 
module.exports = { signRequestMarginKuCoin };