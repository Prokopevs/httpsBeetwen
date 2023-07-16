let { oldMilkyArr, currentMilkyArr } = require('../Data')
const { fetchOrderBook } = require('../OrderBook/fetchOrderBook')
const { logEvents } = require('../middleware/logger')

const accumulate = () => {
    let preBuyArr = []
    for(let i=0; i<oldMilkyArr.length; i++) {
        let index = currentMilkyArr.findIndex((elem) => elem.nickName === oldMilkyArr[i].nickName)
        
        if(index !== -1) {
            oldMilkyArr[i].count++
            currentMilkyArr.splice(index, 1)

            if(oldMilkyArr[i].count === 4) {
                preBuyArr.push(oldMilkyArr[i])

                oldMilkyArr.splice(i, 1)
                i--
            }
        } else {
            logEvents(JSON.stringify(oldMilkyArr[i]), 'coins.log')
            oldMilkyArr.splice(i, 1)
            i--
        }
    }
    oldMilkyArr = [...oldMilkyArr, ...currentMilkyArr]
    currentMilkyArr.splice(0, currentMilkyArr.length)

    if(preBuyArr.length) {
        fetchOrderBook(preBuyArr)
    }
}


module.exports = { accumulate }