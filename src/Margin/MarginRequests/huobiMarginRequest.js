const crypto = require('crypto') 
const axios = require('axios') 
 
const getRequestInstance = (config) => { 
    return axios.create({ 
      ...config 
    }) 
} 
 
const createRequest = (config) => { 
    const { baseURL, method, url, } = config 
    return getRequestInstance({ 
      baseURL, 
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
 
const signRequestMarginHuobi = async (method, path, param, baseURL, apiKey, apiSecret) => { 
    const timestamp = new Date().toISOString().slice(0, 19); 
    const params = `AccessKeyId=${apiKey}&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=${encodeURIComponent(timestamp)}`
    const host = 'api.huobi.pro' 
    const payload = `${method}\n${host}\n${path}\n${params}`
 
    const signature = sign(payload, apiSecret); 
 
    const url = `${path}?${params}&Signature=${encodeURIComponent(signature)}` 
 
    return createRequest({ 
      baseURL, 
      method, 
      url: url, 
      apiKey: apiKey, 
      signature: signature, 
      timestamp: timestamp 
    }) 
} 
 
module.exports = { signRequestMarginHuobi };
