let binanceFee = {feeData: []}
let mexcFee = {feeData: []}
let bybitFee = {feeData: []}
let gateIoFee = {feeData: []}

let fullNameFromCMCArr = {feeData: []}
const gateIoNetworkObj = {"ETH":"ETH/ERC20","GTEVM":"GateChain/GRC20","BTC":"Bitcoin BRC20/Ordinals","TRX":"Tron/TRC20","BSC":"BSC/BEP20","KAVAEVM":"KAVA EVM","HT":"Heco","SOL":"Solana","AVAX_C":"AVAX C-Chain","ALGO":"Algorand","NEAR":"Near","MATIC":"Polygon/MATIC","ARBEVM":"Arbitrum One","OPETH":"Optimism","KSMSM":"Kusama","DOTSM":"Polkadot","OKT":"OKExChain","ARBNOVA":"Arbitrum Nova","ZKSERA":"ZkSync Era","VET":"Vechain","ADA":"Cardano","GAS_OLD":"Neo N2","GAS":"Neo N3","ETHF":"EthereumFair","ETHW":"EthereumPoW","ATOM":"Cosmos","KAVA":"Kava Chain","KAI":"KardiaChain","DOT":"Polkadot","LUNA":"Terra","BNC":"Bifrost-Kusama","SDNEVM":"Shiden EVM","ASTREVM":"Astar EVM","KINTSUGI":"Kintsugi","INTERLAY":"Interlay","GLMR":"Moonbeam Network","PHA":"Phala","PHAKSM":"Khala","BNB":"BNB/BEP2","RBTC":"RSK","FLOW":"Flow","WAVES":"Waves","TLOSEVM":"Telos EVM","EVER":"Everscale Chain","CLVEVM":"CLV EVM","KLAY":"Klaytn","METIS":"Metis Token","BTT":"BTTC_t","CFXEVM":"CFX eSpace","EGLD":"Elrond","GO":"GoChain","FRAEVM":"Findora EVM","CRO":"CRONOS","ONE":"Harmony/HRC20","APT":"Aptos","FTM":"Fantom","NULSEVM":"Nuls EVM","OSMO":"Osmosis","ELA":"ELA mainchain","KONCHAIN":"KON","CHZ":"Chiliz","BOBAEVM":"Boba Network","DOGEEVM":"Dogechain","AURORAEVM":"Aurora Chain","LUNC":"TERRA CLASSIC/LUNC"}

const mexcNetworkObj = {"LUNC":"TERRA CLASSIC/LUNC"}

module.exports = { binanceFee, mexcFee, bybitFee, gateIoFee,     fullNameFromCMCArr, gateIoNetworkObj, mexcNetworkObj}