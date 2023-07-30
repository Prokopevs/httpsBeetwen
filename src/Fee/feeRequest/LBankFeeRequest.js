const crypto = require('crypto')
const axios = require('axios')
 
async function getTimestamp() { 
  const { data } = await axios.get("https://api.lbkex.com/v2/timestamp.do"); 
  return data.ts; 
} 
 
const getRequestInstance = (config) => { 
    return axios.create({ 
      ...config 
    }) 
} 
 
const createRequest = (config) => { 
    const { baseURL, method, url, apiKey, signature, echostr, timestamp } = config 
    return getRequestInstance({ 
      baseURL, 
      headers: { 
        contentType:'application/x-www-form-urlencoded', 
        timestamp: timestamp, 
        signature_method: 'HmacSHA256', 
        echostr: echostr 
      } 
    }).request({ 
      method, 
      url 
    }) 
} 
 
const LBanksignRequest = async (method, path, params, baseURL, apiKey, apiSecret) => { 
    const timestamp = await getTimestamp(); //timestamp 
    const echostr = crypto.randomBytes(17).toString('hex'); 
    const queryString = `api_key=${apiKey}&echostr=${echostr}&signature_method=HmacSHA256&timestamp=${timestamp}`
    const MD5 = crypto.createHash('md5').update(queryString).digest('hex').toUpperCase(); 
    let signature = crypto.createHmac("sha256", apiSecret).update(MD5).digest("hex"); 
     
    const par = `?api_key=${apiKey}&sign=${signature}` 
    return createRequest({ 
      baseURL, 
      method, 
      url: path + par, 
      apiKey: apiKey, 
      signature: signature, 
      echostr: echostr, 
      timestamp: timestamp 
    }) 
} 

module.exports = { LBanksignRequest };
 