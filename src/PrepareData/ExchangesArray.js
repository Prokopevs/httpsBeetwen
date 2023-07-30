let flag = {value: 0}

let binanceArr = {data: []}
let mexcArr = {data: []}
let bybitArr = {data: []}
let gateIoArr = {data: []}
let coinbaseArr = {data: []}
let lbankArr = {data: []}

const mexcBlackList = ['MULTIUSDT', 'RUNEUSDT', 'MDXUSDT', ]
const binanceBlackList = ['AXSBIDR', 'NBTBIDR', 'NBTUSDT', 'MULTIUSDT', 'RUNEUSDT', 'MDXUSDT', ]
const bybitBlackList = ['DASHUSDT', 'ZECUSDT', 'TOMSUSDT', 'RUNEUSDT', ]
const gateIoBlackList = []
const lbankBlackList = ['IDUSDT', ]

// расбанить RUNEUSDT, MULTIUSDT, 'MDXUSDT'

module.exports = { binanceArr, mexcArr, bybitArr, gateIoArr, coinbaseArr, lbankArr,    flag, mexcBlackList, binanceBlackList, bybitBlackList, gateIoBlackList, lbankBlackList}