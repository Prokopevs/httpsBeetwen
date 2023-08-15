const { UniswapETH_0_USDC, UniswapETH_1_USDC, UniswapETH_0_USDT, UniswapETH_1_USDT, UniswapETH_0_DAI, UniswapETH_1_DAI} = require("./fetchPoolsETH")
const { UniswapPolygon_0_USDC, UniswapPolygon_1_USDC } = require("./fetchPoolsMATIC")

const getPoolsUniswap = async () => {
    const ETH = [UniswapETH_0_USDC(), UniswapETH_1_USDC(), UniswapETH_0_USDT(), UniswapETH_1_USDT(), UniswapETH_0_DAI(), UniswapETH_1_DAI()]
    const MATIC = [UniswapPolygon_0_USDC(), UniswapPolygon_1_USDC()]
    const requests = [...ETH, ...MATIC]
    
    let readyArr = []
    await Promise.all(requests)
        .then(results => { 
            results.forEach((result, num) => {
                readyArr = [...readyArr, ...result]
            })
        })

    // console.log(readyArr.length)
    return readyArr
}

module.exports = { getPoolsUniswap }