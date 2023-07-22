let { oldMilkyArr, currentMilkyArr, temporary5minBlackArr } = require('../Data')
const { fetchOrderBook } = require('../OrderBook/fetchOrderBook')
const { logEvents } = require('../middleware/logger')
const { format } = require('date-fns')

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

    clear5minBlackArr()
}

const clear5minBlackArr = () => {
    const dateNow = new Date()
    for(let i=0; i<temporary5minBlackArr.data.length; i++) {
        const blockTime = temporary5minBlackArr.data[i].blockingTime
        const diff = Math.abs(dateNow.getTime() - blockTime.getTime());
        let minutes = Math.floor((diff/1000)/60);
        // console.log(temporary5minBlackArr.data[i].symbol + ' ' + minutes)
        if(minutes >= 5) {
            temporary5minBlackArr.data.splice(i, 1)
            i--
            continue
        }
        
    }
}


module.exports = { accumulate }