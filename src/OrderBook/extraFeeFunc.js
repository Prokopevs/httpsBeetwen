const { extraFeeMexc } = require("./orderBookData")

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
    return 0
}



module.exports = { extraFeeFunc }