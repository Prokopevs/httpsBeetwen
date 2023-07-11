let { oldMilkyArr, currentMilkyArr } = require('../Data')
const { logEvents } = require('../middleware/logger')

const accumulate = () => {
    for(let i=0; i<oldMilkyArr.length; i++) {
        let index = currentMilkyArr.findIndex((elem) => elem.nickName === oldMilkyArr[i].nickName)
        
        if(index !== -1) {
            oldMilkyArr[i].count++
            currentMilkyArr.splice(index, 1)

            if(oldMilkyArr[i].count === 5) {
                logEvents(JSON.stringify(oldMilkyArr[i]), 'coins.log')
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
}


module.exports = { accumulate }