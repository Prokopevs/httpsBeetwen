const { extraFeeMexc, extraFeeLbank, extraFeeBitget, extraFeeGateIo } = require("./orderBookData")

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

    if(buyExchangeName == 'bitget') {
        const coin = extraFeeBitget.find((item) => item.coin === requestedCoin.baseAsset)
        if(coin) {
            return coin.withdraw
        }
    }
    if(sellExchangeName == 'bitget') {
        const coin = extraFeeBitget.find((item) => item.coin === requestedCoin.baseAsset)
        if(coin) {
            return coin.deposit
        }
    }

    if(buyExchangeName == 'gateIo') {
        const coin = extraFeeGateIo.find((item) => item.coin === requestedCoin.baseAsset)
        if(coin) {
            return coin.withdraw
        }
    }
    if(sellExchangeName == 'gateIo') {
        const coin = extraFeeGateIo.find((item) => item.coin === requestedCoin.baseAsset)
        if(coin) {
            return coin.deposit
        }
    }
    return 0
}



module.exports = { extraFeeFunc }