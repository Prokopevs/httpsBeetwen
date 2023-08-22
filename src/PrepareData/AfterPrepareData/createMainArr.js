let { mainData } = require('../../Data')

const createMainArr = (allCoins) => {
    for(let i=0; i<allCoins.length; i++) {        
        let index = mainData.data.findIndex(item => item.coinName == allCoins[i].symbol)
        if(index !== -1) {
            mainData.data[index].indexesInAllCoins.push(i)
        } else {
            let obj = {
                coinName: allCoins[i].symbol,
                indexesInAllCoins: [i]
            }
            mainData.data.push(obj)
        }
    }
}

module.exports = { createMainArr };
