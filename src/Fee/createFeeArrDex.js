
const createFeeArrDex = (obj, side) => {
    const resultObj = {
        coin: obj.baseAsset,
        name: side === 'b' ? obj.names[0] : obj.names[1],
        networkList: [
            {
                network: side === 'b' ? obj.buyNetwork : obj.sellNetwork,
                withdrawFee: 0,
                withdrawEnable: true,
                depositEnable: true
            }
        ]
    }
    return [resultObj]
}

module.exports = {createFeeArrDex}