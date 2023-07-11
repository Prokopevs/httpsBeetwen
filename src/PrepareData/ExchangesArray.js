let flag = {value: 0}

let binanceArr = {data: []}
let mexcArr = {data: []}
const mexcBlackList = ['GASUSDT', 'GMTUSDT', 'QIUSDT', 'MDTUSDT']
const binanceBlackList = ['AXSBIDR', 'NBTBIDR', 'NBTUSDT' ]

module.exports = { binanceArr, mexcArr, flag,  mexcBlackList, binanceBlackList}