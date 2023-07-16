let { binanceFee, mexcFee, } = require('./feeData')


const isWithdrawEnable = (obj) => {
    const unicNames = {
        'binance': ['networkList', 'name', 'depositEnable', 'withdrawEnable'],
        'mexc': ['networkList', 'name', 'depositEnable', 'withdrawEnable']
    }
    
    const feeObj = {
        binance: binanceFee.feeData,
        mexc: mexcFee.feeData,
    }
    const coinName = obj.baseAsset
    const withdrawArr = feeObj[obj.buyFrom]
    const depositArr = feeObj[obj.sellTo]

    const exchagneBuyArr = unicNames[obj.buyFrom]
    const exchagneSellArr = unicNames[obj.sellTo]
    const withdrawNetworkList = withdrawArr.find((elem) => elem.coin === coinName)[exchagneBuyArr[0]].filter((elem) => elem[exchagneBuyArr[3]] == true)
    const depositNetworkList = depositArr.find((elem) => elem.coin === coinName)[exchagneSellArr[0]].filter((elem) => elem[exchagneSellArr[2]] == true)

    

    console.log(withdrawNetworkList)
    console.log(depositNetworkList)
}

module.exports = { isWithdrawEnable };