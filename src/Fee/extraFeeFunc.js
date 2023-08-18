const { extraFeeMexc, extraFeeLbank, extraFeeBitget, extraFeeGateIo, extraFeeHuobi, extraFeePoloniex } = require("../OrderBook/orderBookData")

const extraFeeFunc = (ExchangeName, requestedCoin, side) => {
    if(ExchangeName == 'mexc') {
        const coin = extraFeeMexc.find((item) => item.coin === requestedCoin.baseAsset)
        if(coin) {
            return side === 'buy' ? coin.withdraw : coin.deposit
        }
    }
    if(ExchangeName == 'lbank') {
        const coin = extraFeeLbank.find((item) => item.coin === requestedCoin.baseAsset)
        if(coin) {
            return side === 'buy' ? coin.withdraw : coin.deposit
        }
    }
    if(ExchangeName == 'bitget') {
        const coin = extraFeeBitget.find((item) => item.coin === requestedCoin.baseAsset)
        if(coin) {
            return side === 'buy' ? coin.withdraw : coin.deposit
        }
    }
    if(ExchangeName == 'gateIo') {
        const coin = extraFeeGateIo.find((item) => item.coin === requestedCoin.baseAsset)
        if(coin) {
            return side === 'buy' ? coin.withdraw : coin.deposit
        }
    }
    if(ExchangeName == 'huobi') {
        const coin = extraFeeHuobi.find((item) => item.coin === requestedCoin.baseAsset)
        if(coin) {
            return side === 'buy' ? coin.withdraw : coin.deposit
        }
    }
    if(ExchangeName == 'poloniex') {
        const coin = extraFeePoloniex.find((item) => item.coin === requestedCoin.baseAsset)
        if(coin) {
            return side === 'buy' ? coin.withdraw : coin.deposit
        }
    }
    return 0
    
}



module.exports = { extraFeeFunc }