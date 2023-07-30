require('dotenv').config({path:__dirname+'/../../.env'})
let { lbankFee, lbankFeeObj } = require('../feeData')
const axios = require("axios")
const { LBanksignRequest } = require('../feeRequest/LBankFeeRequest')

const apiKeyLBank = process.env.apiKeyLBank
const apiSecretLBank = process.env.apiSecretLBank

const getFeeLBank = async () => {
    const result = await LBanksignRequest('POST', '/v2/supplement/asset_detail.do', {}, 'https://api.lbkex.com', apiKeyLBank, apiSecretLBank)
    const readyResult = result.data.data

    const response = await axios.get('https://api.lbkex.com/v2/withdrawConfigs.do')
    const newData = response.data.data
    const data = newData.filter((item) => item.chain)
    const feeArr = []

    for(let i=0; i<data.length; i++) {
        const assetCodeToUpper = data[i].assetCode.toUpperCase()
        const moreInfo = readyResult[assetCodeToUpper.toLowerCase()]
        
        const assetCode = feeArr.find((item) => item.coin === assetCodeToUpper)
        const allDepositEnable = moreInfo ? moreInfo.depositStatus : false
        const name = data[i].chain.toUpperCase()  // ERC20
        const fee = lbankFeeObj[assetCodeToUpper]?.[name] //0.2
        if(assetCode !== undefined) {
            const networkObj = {
                name: name,
                withdrawFee: fee ? fee : 0,
                withdrawEnable: data[i].canWithDraw,
                depositEnable: allDepositEnable === false ? false : data[i].canWithDraw
            }
            assetCode.networkList.push(networkObj)
        } else {
            const resultObj = {
                coin: assetCodeToUpper,
                networkList: [
                    {
                        name: name,
                        withdrawFee: fee ? fee : 0,
                        withdrawEnable: data[i].canWithDraw,
                        depositEnable: allDepositEnable === false ? false : data[i].canWithDraw
                    }
                ]
            }
            feeArr.push(resultObj)
        }
    }

    // for(let i=0; i<feeArr.length; i++) {
    //     console.log(feeArr[i])
    // }
    lbankFee.feeData = feeArr
    return feeArr
}

module.exports = { getFeeLBank };