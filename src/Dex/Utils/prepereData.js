const createQuery = (token, address) => {
    const query = `
    {  
        pools0: pools(
            orderBy: volumeUSD    
            orderDirection: desc
            first: 1000    
            where: {
                ${token}: "${address}"      
                volumeUSD_gt: 1000
            }  
        )   {
            id    
            token0 {
                id      
                symbol
                name     
                decimals
            }    
            token1 {
                id      
                symbol
                name      
                decimals
            }    
            token0Price
            token1Price    
            feeTier
            volumeUSD  
        }
    }`

    return query
}

const prepareData = (data, first, second, network) => {
    for(let i=0; i<data.length; i++) {
        data[i].network = network
        const tFirst = 'token'+first
        const tSecond = 'token'+second
        const priceSecond = tSecond+'Price'
        let name = data[i][tFirst].name
        
        while ((name.endsWith('Token')) || (name.endsWith('token')) || (name.endsWith('(PoS)'))) {
            const words = name.split(' ')
            words.pop()
            name = words.join(' ')
        }

        data[i].symbol = data[i][tFirst].symbol+'USDT'
        data[i].originalSymbol = data[i][tFirst].symbol+data[i][tSecond].symbol
        data[i].name = name
        data[i].exchangeName = 'uniswap'
        data[i].exchangeType = 'DEX'

        data[i].baseAsset = data[i][tFirst].symbol
        data[i].quoteAsset = 'USDT'
        data[i].originalQuoteAsset = data[i][tSecond].symbol

        data[i].askPrice = data[i][priceSecond]
        data[i].bidPrice = data[i][priceSecond]

        data[i].isolated = false
        data[i].cross = false
    }
    return data
}


module.exports = { createQuery, prepareData }
