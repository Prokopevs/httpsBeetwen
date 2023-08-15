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
    const { baseURL, method, url, header, apiKey, proxy } = config
    return getRequestInstance({
      baseURL,
      proxy,
      headers: {
        'Content-Type': 'application/json',
        [header]: apiKey,
        ...(header == 'X-MEXC-APIKEY' && {recvWindow: 15000}),
      }
    }).request({
      method,
      url
    })
}

const signRequest = (method, path, params, baseURL, header, apiKey, apiSecret) => {
    const timestamp = Date.now()
    const queryString = buildQueryString({ ...params, timestamp })

    let signature = crypto
        .createHmac('sha256', apiSecret)
        .update(queryString)
        .digest('hex')
    
    return createRequest({
      baseURL,
      method,
      url: `${path}?${queryString}&signature=${signature}`,
      header,
      apiKey: apiKey,
      proxy: false,
    })
}

const publicRequest = (method, path, params, baseURL, header, apiKey ) => {
    params = buildQueryString(params)
    if (params !== '') {
      path = `${path}?${params}`
    }

    return createRequest({
        baseURL,
        method,
        url: path,
        header,
        apiKey: apiKey,
        proxy: false,
    })
}

module.exports = { signRequest, publicRequest };
