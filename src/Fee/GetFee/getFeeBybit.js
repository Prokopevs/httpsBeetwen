require('dotenv').config({path:__dirname+'/../../.env'})
const { bybitSignRequest } = require('../feeRequest/bybitFeeRequest')
let { bybitFee } = require('../feeData')

const apiKeyBybit = process.env.apiKeyBybit
const apiSecretBybit = process.env.apiSecretBybit

const getFeeBybit = async () => {
    const result = await bybitSignRequest('GET', '/v5/asset/coin/query-info', {}, 'https://api.bybit.com', apiKeyBybit, apiSecretBybit)
    const data = result.data.result.rows
    for(let i=0; i<data.length; i++) {
        for(let j=0; j<data[i].chains.length; j++) {
            data[i].chains[j].depositEnable = data[i].chains[j].chainDeposit === '1' ? true : false
            data[i].chains[j].withdrawEnable = data[i].chains[j].chainWithdraw === '1' ? true : false
        }
    }

    bybitFee.feeData = data
    return data
}

module.exports = { getFeeBybit };


