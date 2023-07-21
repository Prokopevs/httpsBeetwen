let flag = {value: 0}

let binanceArr = {data: []}
let mexcArr = {data: []}
let bybitArr = {data: []}

const mexcBlackList = ['MULTIUSDT', 'RUNEUSDT', 'MDXUSDT', ]
const binanceBlackList = ['AXSBIDR', 'NBTBIDR', 'NBTUSDT', 'MULTIUSDT', 'RUNEUSDT', 'MDXUSDT', ]
const bybitBlackList = ['DASHUSDT', 'ZECUSDT', 'TOMSUSDT', 'RUNEUSDT', ]

// расбанить RUNEUSDT, MULTIUSDT, 'MDXUSDT'

module.exports = { binanceArr, mexcArr, bybitArr, flag,  mexcBlackList, binanceBlackList, bybitBlackList}