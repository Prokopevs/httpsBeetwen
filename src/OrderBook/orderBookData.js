
let spotFee = {
    binance: 0.075,
    mexc: 0,
    bybit: 0.1,
    gateIo: 0.15,
    coinbase: 0.2,
    lbank: 0.1,
}

const extraFeeMexc = [{coin:'LOOP', withdraw:10, deposit:10}, {coin:'KISHU', withdraw:2, deposit:4}, {coin:'QUACK', withdraw:12, deposit:24}, {coin:'BRISE', withdraw:12, deposit:24}, {coin:'FLOKICEO', withdraw:10, deposit:20}, {coin:'PIT', withdraw:4, deposit:8}, {coin:'SAFEMARS', withdraw:4, deposit:8}, {coin:'PIG', withdraw:5, deposit:10}, {coin: 'SQUIDGROW', withdraw:8, deposit:8}, {coin: 'SHIRYO', withdraw:10, deposit:20}, ]

const extraFeeLbank = [{coin:'BABYDOGE', withdraw:10, deposit:0}, {coin:'KABOSU', withdraw:12, deposit:0}, {coin:'SHIRYO', withdraw:11, deposit:0}, {coin:'ASPC', withdraw:1, deposit:0}, {coin:'WBX', withdraw:0.2, deposit:0}, {coin:'LUNC', withdraw:1.5, deposit:0}, {coin:'BRISE', withdraw:12, deposit:0}, {coin:'ALLIN', withdraw:4, deposit:0}, {coin:'SAITAMA', withdraw:4, deposit:0}, {coin:'CATGIRL', withdraw:5, deposit:0}, {coin:'HERO', withdraw:13, deposit:0},]

module.exports = { spotFee, extraFeeMexc, extraFeeLbank, }