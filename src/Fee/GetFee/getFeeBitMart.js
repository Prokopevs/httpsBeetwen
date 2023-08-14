let { bitmartFee, bitmartFeeObj } = require('../feeData')
const { logEvents } = require("../../middleware/logger")

const getFeeBitMart = async () => {
    const bitmartBlackList = ['Vote', 'FUTURE']
    const urlsArr = ['https://api-cloud.bitmart.com/account/v1/currencies', 'https://api-cloud.bitmart.com/spot/v1/currencies']
    let arrRequest = urlsArr.map((url) => fetch(url).then((response) => response.json()))

    let data
    let spot
    await Promise.all(arrRequest)
    .then(results => { 
        data = results[0].data.currencies
        spot = results[1].data.currencies
    })

    for(let i=0; i<data.length; i++) {
        if(data[i].currency.includes('-')) {
            const arr = data[i].currency.split('-')
            data[i].currency = arr[0]
        }
        if(bitmartBlackList.includes(data[i].currency)) {
            data.splice(i, 1)
            i--
        }
    }
    
    const feeArr = []
    for(let i=0; i<data.length; i++) {
        const currency = data[i].currency // 'USDT'
        const objName = spot.find((item) => item.id === currency)

        const coinItem = feeArr.find((item) => item.coin === currency)
        let NewNetwork = data[i].network //ERC20
        if(NewNetwork === 'BSC') NewNetwork = 'BSC/BEP20'
        const fee = bitmartFeeObj[currency]?.[NewNetwork] //0.2

        if(coinItem !== undefined) {
            const networkObj = {
                network: NewNetwork,
                withdrawFee: fee,
                withdrawEnable: data[i].withdraw_enabled,
                depositEnable: data[i].deposit_enabled
            }
            coinItem.networkList.push(networkObj)
        } else {
            const resultObj = {
                coin: currency,
                name: objName.name,
                networkList: [
                    {
                        network: NewNetwork,
                        withdrawFee: fee,
                        withdrawEnable: data[i].withdraw_enabled,
                        depositEnable: data[i].deposit_enabled
                    }
                ]
            }
            feeArr.push(resultObj)
        }
    }

    // {"GGT":{"ERC20":0},"GAYPEPE":{"BEP20":0},
    // const bitmartFeeObj = {}
    // for(let i=0; i<feeArr.length; i++) {
    //     const coin = feeArr[i].coin
    //     const networkList = feeArr[i].networkList
    //     const obj = {}
    //     for(let j=0; j<networkList.length; j++) {
    //         const network = networkList[j].network
    //         obj[network] = 0
    //     }
    //     bitmartFeeObj[coin] = obj
    // }
    // logEvents(JSON.stringify(bitmartFeeObj), 'coins.log')

    bitmartFee.feeData = feeArr
    return feeArr
}

module.exports = { getFeeBitMart };