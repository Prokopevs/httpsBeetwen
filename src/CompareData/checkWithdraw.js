const { currentMilkyArr, temporary5minBlackArr } = require("../Data")
const { isWithdrawEnable } = require("../Fee/isWithdrawEnable")

const checkWithdraw = (obj) => {
    const transferInfo = isWithdrawEnable(obj)
    if((Object.keys(transferInfo.data).length !== 0)) {
        obj.transferInfo = transferInfo
        currentMilkyArr.push(obj)
    } else if(obj.buyFrom === 'coinbase' || obj.sellTo === 'coinbase') {
        obj.transferInfo = transferInfo
        currentMilkyArr.push(obj)  
    } else { 
        obj.blockingTime = new Date() // сохраняем время блокировки
        obj.timeInBlock = 60
        temporary5minBlackArr.data.push(obj) // пушим в 5 минутный блокировочный массив
    }
}

module.exports = { checkWithdraw }