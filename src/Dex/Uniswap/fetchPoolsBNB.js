const axios = require("axios")
const { createQuery, prepareData } = require("../Utils/prepereData")

const UniswapBNB_0_USDT = async () => {
    const url = 'https://api.thegraph.com/subgraphs/name/ilyamk/uniswap-v3---bnb-chain'
    const query = createQuery('token0', "0x55d398326f99059ff775485246999027b3197955")

    const result = await axios.post(url, {query: query})
    const data = result.data.data.pools0
    const preparedData = prepareData(data, 1, 0, 'BSC/BEP20')
    return preparedData
}

const UniswapBNB_1_USDT = async () => {
    const url = 'https://api.thegraph.com/subgraphs/name/ilyamk/uniswap-v3---bnb-chain'
    const query = createQuery('token1', "0x55d398326f99059ff775485246999027b3197955")

    const result = await axios.post(url, {query: query})
    const data = result.data.data.pools0
    const preparedData = prepareData(data, 0, 1, 'BSC/BEP20')
    return preparedData
}

const UniswapBNB_0_USDC = async () => {
    const url = 'https://api.thegraph.com/subgraphs/name/ilyamk/uniswap-v3---bnb-chain'
    const query = createQuery('token0', "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d")

    const result = await axios.post(url, {query: query})
    const data = result.data.data.pools0
    const preparedData = prepareData(data, 1, 0, 'BSC/BEP20')
    return preparedData
}

const UniswapBNB_1_USDC = async () => {
    const url = 'https://api.thegraph.com/subgraphs/name/ilyamk/uniswap-v3---bnb-chain'
    const query = createQuery('token1', "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d")

    const result = await axios.post(url, {query: query})
    const data = result.data.data.pools0
    const preparedData = prepareData(data, 0, 1, 'BSC/BEP20')
    return preparedData
}


module.exports = { UniswapBNB_0_USDT, UniswapBNB_1_USDT, UniswapBNB_0_USDC, UniswapBNB_1_USDC }