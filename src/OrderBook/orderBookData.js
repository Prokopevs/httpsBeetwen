const chains = {data: []}
let spotFee = {
    binance: 0.075,
    mexc: 0,
    bybit: 0.1,
    gateIo: 0.15,
    coinbase: 0.2,
    lbank: 0.15,
    kucoin: 0.1,
    okx: 0.1,
    bitget: 0.08,
    huobi: 0.15,
}

const extraFeeMexc = [{coin:'LOOP', withdraw:10, deposit:10}, {coin:'KISHU', withdraw:2, deposit:4}, {coin:'QUACK', withdraw:12, deposit:24}, {coin:'BRISE', withdraw:12, deposit:24}, {coin:'FLOKICEO', withdraw:10, deposit:20}, {coin:'PIT', withdraw:4, deposit:8}, {coin:'SAFEMARS', withdraw:4, deposit:8}, {coin:'PIG', withdraw:5, deposit:10}, {coin: 'SQUIDGROW', withdraw:8, deposit:8}, {coin: 'SHIRYO', withdraw:10, deposit:20}, {coin: 'ASS', withdraw:10, deposit:20}, {coin: 'BABYDOGE', withdraw:10, deposit:0},]

const extraFeeLbank = [ {coin:'KABOSU', withdraw:12, deposit:0}, {coin:'BABYDOGE', withdraw:10, deposit:0}, {coin:'SHIRYO', withdraw:11, deposit:0}, {coin:'ASPC', withdraw:1, deposit:0}, {coin:'WBX', withdraw:0.2, deposit:0}, {coin:'LUNC', withdraw:1.5, deposit:0}, {coin:'BRISE', withdraw:12, deposit:0}, {coin:'ALLIN', withdraw:4, deposit:0}, {coin:'SAITAMA', withdraw:4, deposit:0}, {coin:'CATGIRL', withdraw:5, deposit:0}, {coin:'HERO', withdraw:13, deposit:0}, {coin:'UUSD', withdraw:1, deposit:0}, {coin:'CPC', withdraw:0.15, deposit:0}, {coin:'0X0', withdraw:5, deposit:0}, {coin:'MMAI', withdraw:8, deposit:0}, {coin:'PESA', withdraw:10, deposit:0}, {coin:'4JNET', withdraw:10, deposit:0}, {coin:'YOOSHI', withdraw:12, deposit:0}, {coin:'TABOO', withdraw:8, deposit:0}, {coin:'CULT', withdraw:0.4, deposit:0}, {coin:'CRP', withdraw:0.2, deposit:0},]

const extraFeeBitget = [{coin:'OGGY', withdraw:10, deposit:0}, {coin:'BABYDOGE', withdraw:20, deposit:0},]

const extraFeeGateIo = [{coin:'BABYDOGE', withdraw:10, deposit:0},]

const extraFeeHuobi = [{coin:'LUNC', withdraw:1.25, deposit:0}, {coin:'SOLO', withdraw:0.02, deposit:0}, {coin:'USTC', withdraw:1.25, deposit:0},]

module.exports = { chains, spotFee, extraFeeMexc, extraFeeLbank, extraFeeBitget, extraFeeGateIo, extraFeeHuobi}