const axios = require("axios")
const { createQuery, prepareData } = require("../Utils/prepereData")

const PancakeSwapBNB_0_USDT = async () => {
    const url = 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-bsc'
    const query = createQuery('token0', "0x55d398326f99059ff775485246999027b3197955")

    const result = await axios.post(url, {query: query})
    const data = result.data.data.pools0
    const preparedData = prepareData(data, 1, 0, 'BSC/BEP20')
    return preparedData
}

const PancakeSwapBNB_1_USDT = async () => {
    const url = 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-bsc'
    const query = createQuery('token1', "0x55d398326f99059ff775485246999027b3197955")

    const result = await axios.post(url, {query: query})
    const data = result.data.data.pools0
    const preparedData = prepareData(data, 0, 1, 'BSC/BEP20')
    return preparedData
}

const PancakeSwapBNB_0_USDC = async () => {
    const url = 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-bsc'
    const query = createQuery('token0', "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d")

    const result = await axios.post(url, {query: query})
    const data = result.data.data.pools0
    const preparedData = prepareData(data, 1, 0, 'BSC/BEP20')
    return preparedData
}

const PancakeSwapBNB_1_USDC = async () => {
    const url = 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-bsc'
    const query = createQuery('token1', "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d")

    const result = await axios.post(url, {query: query})
    const data = result.data.data.pools0
    const preparedData = prepareData(data, 0, 1, 'BSC/BEP20')
    return preparedData
}


module.exports = { PancakeSwapBNB_0_USDT, PancakeSwapBNB_1_USDT, PancakeSwapBNB_0_USDC, PancakeSwapBNB_1_USDC }