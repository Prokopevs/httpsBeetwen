require('dotenv').config({path:__dirname+'/../../.env'})
let { okxFee } = require('../feeData')
const { signRequestOKX } = require('../feeRequest/OKXFeeRequest')

const apiKeyOKX = process.env.apiKeyOKX
const apiSecretOKX = process.env.apiSecretOKX
const apiPassphraseOKX = process.env.apiPassphraseOKX

const getFeeOKX = async () => {
    const result = await signRequestOKX('GET', '/api/v5/asset/currencies', {}, 'https://www.okx.cab', apiKeyOKX, apiSecretOKX, apiPassphraseOKX)
    const data = result.data.data
    const feeArr = []

    for(let i=0; i<data.length; i++) {
        const ccy = data[i].ccy // 'BABYDOGE'
        const coinItem = feeArr.find((item) => item.coin === ccy)
        let NewNetwork = data[i].chain.split('-').slice(1).join('-') //ERC20
        if(NewNetwork === 'BSC') NewNetwork = 'BSC(BEP20)'

        if(coinItem !== undefined) {
            const networkObj = {
                network: NewNetwork,
                withdrawFee: data[i].minFee,
                withdrawEnable: data[i].canWd,
                depositEnable: data[i].canDep
            }
            coinItem.networkList.push(networkObj)
        } else {
            const resultObj = {
                coin: ccy,
                name: data[i].name,
                networkList: [
                    {
                        network: NewNetwork,
                        withdrawFee: data[i].minFee,
                        withdrawEnable: data[i].canWd,
                        depositEnable: data[i].canDep
                    }
                ]
            }
            feeArr.push(resultObj)
        }
    }

    okxFee.feeData = feeArr
    return feeArr
}

module.exports = { getFeeOKX };


