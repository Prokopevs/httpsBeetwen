const crypto = require('crypto')
const axios = require('axios')

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
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "KEY": apiKey,
        "Timestamp":timestamp,
        "SIGN":signature,    
      }
    }).request({
      method,
      url
    })
}

const gateIoFeeRequest = (method, path, params, baseURL, apiKey, apiSecret) => {
    const timestamp = (new Date().getTime() / 1000).toString()

    let hasString = crypto.createHash('sha512').update('').digest('hex')

    const queryString = [method, path, '', hasString, timestamp].join('\n')

    let signature = crypto
        .createHmac('sha512', apiSecret)
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

module.exports = { gateIoFeeRequest };