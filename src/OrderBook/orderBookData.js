
let spotFee = {
    binance: 0.075,
    mexc: 0,
    bybit: 0.1,
    gateIo: 0.15,
}

const extraFeeMexc = [{coin:'LOOP', withdraw:10, deposit:10}, {coin:'KISHU', withdraw:2, deposit:4}, {coin:'QUACK', withdraw:12, deposit:24}, {coin:'BRISE', withdraw:12, deposit:24}, {coin:'FLOKICEO', withdraw:10, deposit:20}, {coin:'PIT', withdraw:4, deposit:8}, {coin:'SAFEMARS', withdraw:4, deposit:8}, {coin:'PIG', withdraw:5, deposit:10}, {coin: 'SQUIDGROW', withdraw:8, deposit:8}]

module.exports = { spotFee, extraFeeMexc }