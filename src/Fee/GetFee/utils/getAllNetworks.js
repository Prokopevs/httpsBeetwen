const { gateIoFeeRequest } = require('../../feeRequest/gateIoFeeRequest')
let { gateIoFee, gateIoNetworkObj } = require('../../feeData')
require('dotenv').config({path:__dirname+'/../../../.env'})


const axios = require("axios")
const { logEvents } = require('../../../middleware/logger')
const apiKeyGateIo = process.env.apiKeyGateIo
const apiSecretGateIo = process.env.apiSecretGateIo

const getAllNetworks = async () => {
    const result = await gateIoFeeRequest('GET', '/api/v4/wallet/withdraw_status', {}, 'https://api.gateio.ws', apiKeyGateIo, apiSecretGateIo)
    const resultData = result.data
    const networkKeysArr = {}
    let count = 0

    for(let i=0; i<resultData.length; i++) {
        const withdraw_fix = resultData[i]?.withdraw_fix_on_chains
        
        if(withdraw_fix) {
            let ress = []
            for (let key in withdraw_fix) {  //{ ETH: '0.88', GTEVM: '0.002' }
                if(networkKeysArr[key]) continue // если есть завершаем
                const findedChain = ress.find((item) => item?.chain === key)
                if(findedChain) {
                    if(key !== findedChain.name_en) {
                        networkKeysArr[key] = findedChain.name_en
                    }
                    continue
                } 
                
                let res
                try{
                    res = await axios.get(`https://api.gateio.ws/api/v4/wallet/currency_chains?currency=${resultData[i].currency}`)
                    console.log(res.data)
                    console.log('запрашиваю...' + count)
                } catch (error) {
                    console.log(error)
                }
                
                if(res.data) {
                    ress = [...res.data]
                    const findedChain2 = ress.find((item) => item?.chain === key)
                    if(findedChain2) {
                        if(key !== findedChain2.name_en) { 
                            networkKeysArr[key] = findedChain2.name_en
                        }
                        continue
                    } else {
                        console.log('не нашёл' + resultData[i].currency)
                    }
                } else {
                    console.log('вернул null' + resultData[i].currency)
                }
                
            }
            count++
        }
    }
    console.log(networkKeysArr)
    logEvents(JSON.stringify(networkKeysArr), 'allNetworks.log')
}

module.exports = { getAllNetworks };