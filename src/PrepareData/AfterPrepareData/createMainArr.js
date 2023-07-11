const createMainArr = (allCoins, mainData) => {
    for(let i=0; i<allCoins.length; i++) {        
        let index = mainData.findIndex(item => item.coinName == allCoins[i].symbol)
        if(index !== -1) {
            mainData[index].indexesInAllCoins.push(i)
        } else {
            let obj = {
                coinName: allCoins[i].symbol,
                indexesInAllCoins: [i]
            }
            mainData.push(obj)
        }
    }
}

module.exports = { createMainArr };
