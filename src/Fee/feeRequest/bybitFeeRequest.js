const crypto = require('crypto')
const axios = require('axios')

const stringifyKeyValuePair = ([key, value]) => {
    const valueString = Array.isArray(value) ? `["${value.join('","')}"]` : value
    return `${key}=${encodeURIComponent(valueString)}`
}

const buildQueryString = (params) => {
    if (!params) return ''
    return Object.entries(params)
        .map(stringifyKeyValuePair)
        .join('&')
}

const getRequestInstance = (config) => {
    return axios.create({
      ...config
    })
}

const createRequest = (config) => {
    const { baseURL, method, url, apiKey, proxy, signature, timestamp } = config
    return getRequestInstance({
      baseURL,
      proxy,
      headers: {
        'Content-Type': 'application/json',
        "X-BAPI-API-KEY": apiKey,
        "X-BAPI-SIGN":signature,
        "X-BAPI-TIMESTAMP":parseInt(timestamp),
        "X-BAPI-RECV-WINDOW":7000
      }
    }).request({
      method,
      url
    })
}

const bybitSignRequest = (method, path, params, baseURL, apiKey, apiSecret) => {
    const timestamp = Date.now().toString()
    const recvWindow = 7000;
    const queryString = timestamp+apiKey+recvWindow.toString()

    let signature = crypto
        .createHmac('sha256', apiSecret)
        .update(queryString)
        .digest('hex')
    
    return createRequest({
      baseURL,
      method,
      url: `${path}`,
      apiKey: apiKey,
      proxy: false,
      signature,
      timestamp
    })
}

module.exports = { bybitSignRequest };