const axios = require("axios")
const { prepareData, createQuery } = require("../Utils/prepereData")

const UniswapETH_0_USDC = async () => {
    const url = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'
    const query = createQuery('token0', "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48")

    const result = await axios.post(url, {query: query})
    const data = result.data.data.pools0
    const preparedData = prepareData(data, 1, 0, 'ERC20')
    return preparedData
}
const UniswapETH_1_USDC = async () => {
    const url = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'
    const query = createQuery('token1', "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48")

    const result = await axios.post(url, {query: query})
    const data = result.data.data.pools0
    const preparedData = prepareData(data, 0, 1, 'ERC20')
    return preparedData
}
const UniswapETH_0_USDT = async () => {
    const url = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'
    const query = createQuery('token0', "0xdac17f958d2ee523a2206206994597c13d831ec7")

    const result = await axios.post(url, {query: query})
    const data = result.data.data.pools0
    const preparedData = prepareData(data, 1, 0, 'ERC20')
    return preparedData
}
const UniswapETH_1_USDT = async () => {
    const url = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'
    const query = createQuery('token1', "0xdac17f958d2ee523a2206206994597c13d831ec7")

    const result = await axios.post(url, {query: query})
    const data = result.data.data.pools0
    const preparedData = prepareData(data, 0, 1, 'ERC20')
    return preparedData
}
const UniswapETH_0_DAI = async () => {
    const url = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'
    const query = createQuery('token0', "0x6b175474e89094c44da98b954eedeac495271d0f")

    const result = await axios.post(url, {query: query})
    const data = result.data.data.pools0
    const preparedData = prepareData(data, 1, 0, 'ERC20')
    return preparedData
}
const UniswapETH_1_DAI = async () => {
    const url = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3'
    const query = createQuery('token1', "0x6b175474e89094c44da98b954eedeac495271d0f")

    const result = await axios.post(url, {query: query})
    const data = result.data.data.pools0
    const preparedData = prepareData(data, 0, 1, 'ERC20')
    return preparedData
}


module.exports = { UniswapETH_0_USDC, UniswapETH_1_USDC, UniswapETH_0_USDT, UniswapETH_1_USDT, UniswapETH_0_DAI, UniswapETH_1_DAI }