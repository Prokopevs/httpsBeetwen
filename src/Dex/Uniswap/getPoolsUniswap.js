const { UniswapETH_0_USDC, UniswapETH_1_USDC, UniswapETH_0_USDT, UniswapETH_1_USDT, UniswapETH_0_DAI, UniswapETH_1_DAI} = require("./fetchPoolsETH")
const { UniswapPolygon_0_USDC, UniswapPolygon_1_USDC } = require("./fetchPoolsMATIC")
const { UniswapBNB_0_USDT, UniswapBNB_1_USDT, UniswapBNB_0_USDC, UniswapBNB_1_USDC } = require("./fetchPoolsBNB")
const { PancakeSwapBNB_0_USDT, PancakeSwapBNB_1_USDT, PancakeSwapBNB_0_USDC, PancakeSwapBNB_1_USDC } = require("../PancakeSwap/fetchPoolsBNB")

const getPoolsUniswap = async () => {
    const ETH = [UniswapETH_0_USDC(), UniswapETH_1_USDC(), UniswapETH_0_USDT(), UniswapETH_1_USDT(), UniswapETH_0_DAI(), UniswapETH_1_DAI()]
    const MATIC = [UniswapPolygon_0_USDC(), UniswapPolygon_1_USDC()]
    const BNB = [UniswapBNB_0_USDT(), UniswapBNB_1_USDT(), UniswapBNB_0_USDC(), UniswapBNB_1_USDC() ]

    const BNBPS = [PancakeSwapBNB_0_USDT(), PancakeSwapBNB_1_USDT(), PancakeSwapBNB_0_USDC(), PancakeSwapBNB_1_USDC()]
    const requests = [...BNBPS]
    
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