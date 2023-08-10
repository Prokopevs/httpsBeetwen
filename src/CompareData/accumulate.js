let { oldMilkyArr, currentMilkyArr, temporary5minBlackArr, requestFlag } = require('../Data')
const { fetchOrderBook } = require('../OrderBook/fetchOrderBook')
const { logEvents } = require('../middleware/logger')

const accumulate = () => {
    let preBuyArr = []
    for(let i=0; i<oldMilkyArr.length; i++) {
        let index = currentMilkyArr.findIndex((elem) => elem.nickName === oldMilkyArr[i].nickName)
        
        if(index !== -1) {
            oldMilkyArr[i].count++
            currentMilkyArr.splice(index, 1)

            if(oldMilkyArr[i].count === 6) {
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
        requestFlag.data = false
        fetchOrderBook(preBuyArr, 'ordinary')
    }

    clear5minBlackArr()
}

const clear5minBlackArr = () => {
    const dateNow = new Date()
    for(let i=0; i<temporary5minBlackArr.data.length; i++) {
        const blockTime = temporary5minBlackArr.data[i].blockingTime
        const timeInBlock = temporary5minBlackArr.data[i].timeInBlock
        const diff = Math.abs(dateNow.getTime() - blockTime.getTime());
        let minutes = Math.floor((diff/1000)/60);
        // console.log(temporary5minBlackArr.data[i].symbol + ' ' + minutes)
        if(minutes >= timeInBlock) {
            temporary5minBlackArr.data.splice(i, 1)
            i--
        }
    }
}


module.exports = { accumulate }