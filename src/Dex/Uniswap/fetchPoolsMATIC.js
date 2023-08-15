const axios = require("axios")
const { createQuery, prepareData } = require("../Utils/prepereData")

const UniswapPolygon_0_USDC = async () => {
    const url = 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon'
    const query = createQuery('token0', "0x2791bca1f2de4661ed88a30c99a7a9449aa84174")

    const result = await axios.post(url, {query: query})
    const data = result.data.data.pools0
    const preparedData = prepareData(data, 1, 0, 'polygon/MATIC')
    return preparedData
}

const UniswapPolygon_1_USDC = async () => {
    const url = 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon'
    const query = createQuery('token1', "0x2791bca1f2de4661ed88a30c99a7a9449aa84174")

    const result = await axios.post(url, {query: query})
    const data = result.data.data.pools0
    const preparedData = prepareData(data, 0, 1, 'polygon/MATIC')
    return preparedData
}


module.exports = { UniswapPolygon_0_USDC, UniswapPolygon_1_USDC }