let { gateIoFee, gateIoNetworkObj } = require('../feeData')
require('dotenv').config({path:__dirname+'/../../.env'})
const { gateIoFeeRequest } = require('../feeRequest/gateIoFeeRequest')
const axios = require("axios")

const apiKeyGateIo = process.env.apiKeyGateIo
const apiSecretGateIo = process.env.apiSecretGateIo

const getFeeGateIo = async () => {
    const result = await gateIoFeeRequest('GET', '/api/v4/wallet/withdraw_status', {}, 'https://api.gateio.ws', apiKeyGateIo, apiSecretGateIo)
    const resultData = result.data

    for(let i=0; i<resultData.length; i++) {
        const networkListArr = []
        const withdraw_fix = resultData[i]?.withdraw_fix_on_chains // { ETH: '1100', BSC: '340' }

        if(withdraw_fix) { // { ETH: '1100', BSC: '340' }
            for (let key in withdraw_fix) {
                const newKey = gateIoNetworkObj[key] ? gateIoNetworkObj[key] : key
                const withdrawObj = {
                    network: newKey,
                    withdrawFee: withdraw_fix[key],
                    depositEnable: true,
                    withdrawEnable: true
                }
                networkListArr.push(withdrawObj)

            }
        }
        resultData[i].networkList = networkListArr
    }

    gateIoFee.feeData = resultData
    return resultData
}

module.exports = { getFeeGateIo };