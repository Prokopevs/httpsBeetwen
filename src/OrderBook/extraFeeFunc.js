const { extraFeeMexc, extraFeeLbank } = require("./orderBookData")

const extraFeeFunc = (buyExchangeName, sellExchangeName, requestedCoin) => {
    if(buyExchangeName == 'mexc') {
        const coin = extraFeeMexc.find((item) => item.coin === requestedCoin.baseAsset)
        if(coin) {
            return coin.withdraw
        }
    }
    if(sellExchangeName == 'mexc') {
        const coin = extraFeeMexc.find((item) => item.coin === requestedCoin.baseAsset)
        if(coin) {
            return coin.deposit
        }
    }
    if(buyExchangeName == 'lbank') {
        const coin = extraFeeLbank.find((item) => item.coin === requestedCoin.baseAsset)
        if(coin) {
            return coin.withdraw
        }
    }
    if(sellExchangeName == 'lbank') {
        const coin = extraFeeLbank.find((item) => item.coin === requestedCoin.baseAsset)
        if(coin) {
            return coin.deposit
        }
    }
    return 0
}



module.exports = { extraFeeFunc }