let binanceFee = {feeData: []}
let mexcFee = {feeData: []}
let bybitFee = {feeData: []}
let gateIoFee = {feeData: []}
let lbankFee = {feeData: []}
let kucoinFee = {feeData: []}
let okxFee = {feeData: []}

let fullNameFromCMCArr = {feeData: []}
const gateIoNetworkObj = {"ETH":"ETH/ERC20","GTEVM":"GateChain/GRC20","BTC":"Bitcoin BRC20/Ordinals","TRX":"Tron/TRC20","BSC":"BSC/BEP20","KAVAEVM":"KAVA EVM","HT":"Heco","SOL":"Solana","AVAX_C":"AVAX C-Chain","ALGO":"Algorand","NEAR":"Near","MATIC":"Polygon/MATIC","ARBEVM":"Arbitrum One","OPETH":"Optimism","KSMSM":"Kusama","DOTSM":"Polkadot","OKT":"OKExChain","ARBNOVA":"Arbitrum Nova","ZKSERA":"ZkSync Era","VET":"Vechain","ADA":"Cardano","GAS_OLD":"Neo N2","GAS":"Neo N3","ETHF":"EthereumFair","ETHW":"EthereumPoW","ATOM":"Cosmos","KAVA":"Kava Chain","KAI":"KardiaChain","DOT":"Polkadot","LUNA":"Terra","BNC":"Bifrost-Kusama","SDNEVM":"Shiden EVM","ASTREVM":"Astar EVM","KINTSUGI":"Kintsugi","INTERLAY":"Interlay","GLMR":"Moonbeam Network","PHA":"Phala","PHAKSM":"Khala","BNB":"BNB/BEP2","RBTC":"RSK","FLOW":"Flow","WAVES":"Waves","TLOSEVM":"Telos EVM","EVER":"Everscale Chain","CLVEVM":"CLV EVM","KLAY":"Klaytn","METIS":"Metis Token","BTT":"BTTC_t","CFXEVM":"CFX eSpace","EGLD":"Elrond","GO":"GoChain","FRAEVM":"Findora EVM","CRO":"CRONOS","ONE":"Harmony/HRC20","APT":"Aptos","FTM":"Fantom","NULSEVM":"Nuls EVM","OSMO":"Osmosis","ELA":"ELA mainchain","KONCHAIN":"KON","CHZ":"Chiliz","BOBAEVM":"Boba Network","DOGEEVM":"Dogechain","AURORAEVM":"Aurora Chain","LUNC":"TERRA CLASSIC/LUNC"}

const mexcNetworkObj = {"LUNC":"TERRA CLASSIC/LUNC"}

const lbankFeeObj = {"LILFLOKI":{"BEP20(BSC)":4200000000},"NUR":{"MATIC":0.02},"FJT":{"TRC20":24},"AIF":{"BEP20(BSC)":3},"GTX":{"TRC20":4600},"IMPT":{"ERC20":2000},"AXM":{"BITONE":0.0003},"CHESS":{"BEP20(BSC)":15},"CPS":{"BEP20(BSC)":180000},"YFII":{"ERC20":0.02},"CLFI":{"ERC20":20},"ALICE":{"BEP20(BSC)":0.1,"ERC20":20},"SOM":{"KLAY":30},"SHIBELON":{"BEP20(BSC)":5000000},"TURBO":{"ERC20":50000},"FTM":{"FANTOM":4},"EBSO":{"ERC20":1200},"PG":{"PG":0.5},"KABOSU1":{"ARBITRUM ONE":70000},"CORE":{"CORE":1},"KABOSU":{"BEP20(BSC)":0},"VNXAU":{"ERC20":0.5,"Q CHAIN":0.02},"DASH":{"DASH":0.01},"BIAO":{"ERC20":4250000},"MONG":{"ERC20":1000000000},"FTT":{"ERC20":18},"ANT":{"ERC20":7},"FRA":{"FRA":200},"SHIRYO":{"ERC20":5000000000000},"LOOTBOT":{"ERC20":20},"RVN":{"RVN":30},"LKC":{"BEP20(BSC)":3000000000},"ABEY":{"ABEY":2},"INU":{"ERC20":1000000000},"DP":{"KLAY":7},"WOO":{"ERC20":120},"FXS":{"ERC20":4},"BEAI":{"BEP20(BSC)":0.5},"AUDIO":{"ERC20":100},"ELYSIAN":{"XRP":290},"IRT":{"BEP20(BSC)":400},"MEF":{"ERC20":30},"MATIC":{"ERC20":30,"MATIC":1},"R3T":{"BEP20(BSC)":50},"ANKR":{"BEP20(BSC)":110,"ERC20":1000},"SXP":{"SOLAR":2},"ZEC":{"ZCASH":0.05},"PORTO":{"BEP20(BSC)":1.2},"STLE":{"STLE":50},"MAGIC":{"ARBITRUM ONE":2},"IMX":{"ERC20":30},"DOGECOLA":{"BEP20(BSC)":1000},"NOVA":{"ERC20":2500000000},"BEN":{"ERC20":300000000},"GULF":{"BEP20(BSC)":40},"BNX":{"BEP20(BSC)":3.5},"LBR":{"ERC20":9},"INJ":{"BEP20(BSC)":0.4},"ARB":{"ARBITRUM ONE":1},"DBX":{"ERC20":140000},"GTC":{"ERC20":5},"WEWE":{"ERC20":20000000},"FIDA":{"SOLANA":2},"REGENT":{"BEP20(BSC)":1},"TPY":{"ERC20":30,"ARBITRUM ONE":3},"AMP":{"ERC20":8000},"FTRB":{"ERC20":3700},"FUNCH":{"BEP20(BSC)":0.5},"MLNS":{"ERC20":500},"LR":{"ERC20":600},"GENSLR":{"ERC20":5000000000},"FET":{"ERC20":100,"BEP20(BSC)":8},"BITCOIN":{"ERC20":200},"STX":{"STACKS":7},"KLAY":{"KLAY":10},"JOE":{"ARBITRUM ONE":5,"C-CHAIN":2},"UTK":{"ERC20":220},"SUSHI":{"ERC20":30},"TVK":{"ERC20":800},"CV":{"ERC20":450},"EDUX":{"BEP20(BSC)":18000},"POR":{"BEP20(BSC)":8000},"CHEQ":{"ERC20":500},"ECOTERRA":{"ERC20":5700},"FEI":{"ERC20":40},"WMX":{"BEP20(BSC)":40},"LINA":{"ERC20":1600,"BEP20(BSC)":100},"HAHA":{"ERC20":3000000},"LBK":{"HECO":100,"ERC20":2000},"ITO":{"BEP20(BSC)":1},"ARKM":{"ERC20":35},"BEL1":{"ERC20":50,"BEP20(BSC)":5},"X2Y2":{"ERC20":800},"GLMR":{"MOONBEAM":4},"AAVE":{"ERC20":0.4},"ASPC":{"ERC20":12000},"HMT":{"ERC20":800},"SIMPSON":{"ERC20":3000000000000},"LGC":{"BEP20(BSC)":400},"COCO":{"ERC20":300},"SDT":{"ERC20":15000},"PC":{"PLUG CHAIN":200},"ARI10":{"BEP20(BSC)":1000},"MKR":{"ERC20":0.04},"HAMA":{"ERC20":36000000},"BAL":{"ERC20":4},"AGLD":{"ERC20":80},"ACS":{"SOLANA":300},"SANTOS":{"BEP20(BSC)":0.8},"WBX":{"ERC20":10000},"1INCH":{"ERC20":50},"BERC":{"ERC20":240},"FIL":{"FILECOIN":0.1},"HALO":{"BEP20(BSC)":50},"VRT":{"GDCC":30},"PAW":{"ERC20":4500000},"PYR":{"ERC20":7,"MATIC":0.2},"MAX":{"BEP20(BSC)":1},"DYDX":{"ERC20":10},"BIBLE":{"ERC20":560000},"ELC":{"ERC20":6000},"VICA":{"ERC20":300},"MOM":{"MATIC":7},"LUNC":{"TERRA CLASSIC":15000},"BRISE":{"BEP20(BSC)":6000000},"GRV":{"BEP20(BSC)":3},"CNX":{"BEP20(BSC)":1000},"ALLIN":{"ERC20":12},"ZIL":{"ZILLIQA":50,"BEP20(BSC)":100},"SAITAMA":{"ERC20":24000},"BIBL":{"BEP20(BSC)":2},"MOG":{"ERC20":1600000000},"POGAI":{"ARBITRUM ONE":20000},"KUSUNOKI":{"ERC20":250000000000},"MBD":{"MBD":2},"FLR":{"FLARE":20},"SHIBLITE":{"BEP20(BSC)":4000000000},"SCRT":{"SECRET":2},"SML":{"MATIC":250},"GNS":{"MATIC":0.1,"ARBITRUM ONE":0.4},"GIP":{"GIP":0.5},"AGIX":{"ERC20":100},"T":{"ERC20":800},"LTC":{"LTC":0.005},"IXT":{"MATIC":3},"BLUE":{"BEP20(BSC)":4000},"CATGIRL":{"BEP20(BSC)":6000000000},"UNLEASH":{"ERC20":33000},"JASMY":{"ERC20":5000},"AIDOGE":{"ARBITRUM ONE":6000000000},"AUC":{"ERC20":40},"KAS":{"KAS":50},"AIN":{"ERC20":1070 },"NXN":{"NAXION":1},"VST":{"BEP20(BSC)":1200},"PEPECOIN":{"ERC20":600},"SYS":{"SYSCOIN UTXO":8,"SYSCOIN ROLLUX":8,"SYSCOIN NEVM":8},"PROS":{"ERC20":60},"OSMO":{"OSMO":1},"LAI":{"BEP20(BSC)":100},"VMPX":{"ERC20":400},"SAFE":{"BEP20(BSC)":0.3,"MATIC":0.1},"LUNA":{"TERRA":1},"EML":{"ERC20":60},"HERO":{"BEP20(BSC)":600},"ISIKC":{"ERC20":90},"RENEC":{"RENEC":1},"XLM":{"STELLAR":10},"PAWSWAP":{"ERC20":2000000000},"GATHER":{"BEP20(BSC)":4},"ALGO":{"ALGO":8},"GTG":{"ERC20":700},"HIGH":{"ERC20":15,"BEP20(BSC)":2},"XCH":{"XCH":0.01},"DUBX":{"DUBX":10},"ESG":{"ERC20":600},"MOB":{"MOBILECOIN":0.5},"DOGECOIN":{"BEP20(BSC)":2000000000},"GMT1":{"BEP20(BSC)":10},"AXS":{"ERC20":3},"C98":{"ERC20":150,"BEP20(BSC)":12},"BLID":{"ERC20":1000},"LKD":{"BEP20(BSC)":5},"GPX":{"BEP20(BSC)":10},"MILO":{"MATIC":6},"DOT":{"DOT":0.1},"USP":{"ERC20":11},"RPL":{"ERC20":0.6},"RAD":{"ERC20":12},"ITLR":{"BEP20(BSC)":2000},"TETRIS":{"ERC20":6000},"RNDR":{"ERC20":10},"GLR":{"ERC20":70},"RLB":{"ERC20":270},"TRX":{"TRC20":1},"FOUR":{"ERC20":8000000},"SFP":{"BEP20(BSC)":2},"EDU":{"BEP20(BSC)":2},"EOS":{"EOS":0.1},"SPONGE":{"ERC20":80000},"DOGE":{"BEP20(BSC)":30,"DOGECOIN":10},"BIG":{"ERC20":2000000},"MLXC":{"MLXC":10},"BB":{"MATIC":2},"GEN":{"ERC20":15000000000},"KAVA":{"KAVA":1},"SNEK":{"CARDANO":3000},"KP3R":{"ERC20":0.4},"DESO":{"DESO":0.1},"WV":{"ERC20":380},"DNX":{"DNX":5},"COMP":{"ERC20":0.7},"CAKE":{"BEP20(BSC)":0.5},"BLUESPARROW":{"ERC20":1000},"AVR":{"BEP20(BSC)":4},"RAPTOR":{"ERC20":20000000000},"MASK":{"ERC20":2},"AVAX":{"C-CHAIN":0.1},"TXO":{"ERC20":57},"PTOY":{"ERC20":2300},"XPR":{"ERC20":560000},"CFC":{"ERC20":12},"POND":{"ERC20":3000},"FTC":{"BEP20(BSC)":3},"RARE":{"ERC20":200},"CHICA":{"BEP20(BSC)":0.8},"YGG":{"ERC20":160},"PEPECHAIN":{"ERC20":6000000000},"WAVES":{"WAVES":0.45},"LOOKS":{"ERC20":300},"GXA":{"KLAY":300},"ANG":{"ERC20":16000},"UUSD":{"UUSD":1},"HABIBI":{"ERC20":50000000},"BUSD":{"BEP20(BSC)":1},"SYN":{"ERC20":40,"BEP20(BSC)":4,"ARBITRUM ONE":3},"QUICK":{"ERC20":400,"MATIC":2},"SOS":{"ERC20":330000000},"TLC":{"BEP20(BSC)":0.15},"TCG2":{"BEP20(BSC)":50},"BLOVELY":{"BEP20(BSC)":1000000000},"NTO":{"ERC20":2000000},"VOB":{"BEP20(BSC)":3},"ICP":{"ICP":0.2},"SPE":{"BEP20(BSC)":500 },"DAI":{"ERC20":30},"FRGST":{"BEP20(BSC)":50000000},"WOJAK":{"ERC20":140000},"ADA":{"ADA":2},"CPC":{"CPC":10},"CATS":{"BEP20(BSC)":3000000000},"THE9":{"ERC20":300 },"SPCFIN":{"BEP20(BSC)":50000},"TNT":{"ERC20":400},"0X0":{"ERC20":300},"BAM":{"ERC20":1000000000},"ARTR":{"ARTR":300},"ARPA":{"ERC20":400},"SILK":{"ERC20":60},"MMAI":{"ERC20":100000},"CBK":{"ERC20":40,"MATIC":2},"SHIB":{"ERC20":2400000,"BEP20(BSC)":300000},"SFL":{"SFL":100},"QNT":{"ERC20":0.3},"HAM":{"BEP20(BSC)":800000000},"BFIC":{"BFIC":0.1},"SUPER":{"BEP20(BSC)":20,"ERC20":150},"ATOZ":{"BEP20(BSC)":20},"MYO":{"ERC20":12},"FOGNET":{"ERC20":5},"MNFT":{"ERC20":1000000},"SAS":{"ARBITRUM ONE":3000},"MC":{"ERC20":120},"EGLD":{"ELROND":0.02,"BEP20(BSC)":0.06},"VT":{"BEP20(BSC)":180},"NEAR":{"NEAR":0.5},"XRP":{"XRP":1},"SHARBI":{"ERC20":10000000},"BNB":{"BEP20(BSC)":0.005},"NFTY":{"ERC20":12000},"DAR":{"ERC20":200,"BEP20(BSC)":20},"KEG":{"BEP20(BSC)":3},"RBE":{"ERC20":10000000},"RSS3":{"ERC20":220},"HFT":{"ERC20":60},"ORDI":{"BRC20":1},"XXX":{"ERC20":26000000},"VRA":{"ERC20":6000},"SCC":{"ERC20":20},"YOSHI":{"FANTOM":5},"MEMEME":{"ERC20":3000000},"BABYDOGE":{"BEP20(BSC)":800000000},"D2T":{"ERC20":2000},"WTEC":{"BEP20(BSC)":5},"CLOUD":{"BEP20(BSC)":440},"MPL":{"ERC20":3},"KSM":{"KUSAMA":0.01},"CHO":{"ERC20":140},"COINSCOPE":{"BEP20(BSC)":800},"DBXX":{"BEP20(BSC)":90},"CRV":{"ERC20":25},"WSB":{"ERC20":500000000},"FCF":{"BEP20(BSC)":24000},"ID":{"BEP20(BSC)":6},"EOSC":{"EOSC":400},"RACA":{"BEP20(BSC)":15000},"SWITCH":{"ERC20":3800},"PESA":{"BEP20(BSC)":80},"DEDE":{"ERC20":630},"KLEE":{"ERC20":2000000000000},"LYNK":{"ERC20":50000},"UNIBOT":{"ERC20":0.15},"MTH":{"ERC20":6000},"SPSI":{"SPS":180},"ETH":{"ERC20":0.005,"BEP20(BSC)":0.001,"ARBITRUM ONE":0.001,"OPTIMISM":0.003},"CHZ":{"ERC20":270},"TOKAMAK":{"ERC20":15},"CRO":{"ERC20":360,"CRONOS":10},"ZCX":{"ERC20":300},"AGF":{"ERC20":3},"BICO":{"ERC20":75},"CRE":{"ERC20":14},"IPVN":{"ERC20":2.5},"STORJ":{"ERC20":80},"POOH":{"ERC20":2000000000},"EVA":{"ERC20":28},"LOOT":{"ERC20":180},"CCV2":{"BEP20(BSC)":1},"SAND":{"ERC20":50},"DSP":{"ERC20":700},"ENT":{"ERC20":6},"YEON":{"BEP20(BSC)":200},"GMX":{"ARBITRUM ONE":0.03},"JSM":{"ERC20":3000},"RIF":{"RSK":7},"LRC":{"ERC20":80},"CXS":{"NX CHAIN":100},"MUDI":{"KLAY":5},"CTP":{"BEP20(BSC)":120},"SUI":{"SUI":1},"POX":{"TRC20":1},"UPC":{"KLAY":2},"CGO":{"XDC":0.02},"VOLT":{"ERC20":50000000 },"MNTL":{"ERC20":5000},"MTVT":{"BEP20(BSC)":600},"CCASH":{"ERC20":7500},"HLPR":{"BEP20(BSC)":0.03,"MATIC":0.03},"ASY":{"BEP20(BSC)":300},"APT":{"APT":0.1},"SAMO":{"SOLANA":100},"BIO":{"BITONE":5},"PEPE2":{"ERC20":300000000},"4JNET":{"BEP20(BSC)":4000000000},"BART":{"BEP20(BSC)":300000000000},"GOLC":{"TRC20":3},"TLM":{"BEP20(BSC)":5,"ERC20":1200},"GC":{"MATIC":500},"STO":{"KLAY":200},"ZEXI":{"MATIC":1},"ETHW":{"ETHW":0.1},"MBOX":{"BEP20(BSC)":6},"REN":{"ERC20":270},"YOOSHI":{"BEP20(BSC)":0},"DOGE20":{"ERC20":2000000000},"USDC":{"ERC20":20,"TRC20":2,"BEP20(BSC)":5,"ARBITRUM ONE":1},"MOVR":{"MOONRIVER":0.1},"HOT":{"ERC20":14500},"SENSO":{"ERC20":300},"BLUR":{"ERC20":45},"GYMNET":{"BEP20(BSC)":80},"HLN":{"BEP20(BSC)":4000},"LIXX":{"BEP20(BSC)":1200},"WCA":{"ERC20":30},"PHB":{"BEP20(BSC)":3},"CFX":{"CONFLUX":1,"EVM":5},"SOL":{"SOLANA":0.05},"QI":{"C-CHAIN":100},"CELR":{"ERC20":1200},"NEOM":{"ERC20":0.6},"WLD":{"ERC20":10,"OPTIMISM":1},"FERC":{"ERC20":50},"TYPE":{"BEP20(BSC)":5},"TABOO":{"BEP20(BSC)":600},"PEOPLE":{"ERC20":1500},"LQTY":{"ERC20":20},"SHINJA":{"ERC20":600000},"SAI":{"KLAY":0.5},"PLASTIK":{"CELO":30},"SHIBDOGE":{"ERC20":400000000000},"CULT":{"ERC20":6000000},"GT":{"ERC20":6},"RXT":{"BEP20(BSC)":1},"RAY":{"SOLANA":3},"BURN":{"ERC20":1300000},"LYO":{"BEP20(BSC)":3},"HT":{"ERC20":7,"HECO":0.5},"7PXS":{"BEP20(BSC)":1},"TRMX":{"BEP20(BSC)":1000},"MR":{"ERC20":4000000},"PPT":{"KLAY":40},"MSHD":{"BEP20(BSC)":200},"SSV":{"ERC20":1.5},"CRP":{"CRP":1},"MAV":{"ERC20":50},"LIT":{"ERC20":30},"PAXG":{"ERC20":0.01},"RENQ":{"ERC20":1000},"TWT":{"BEP20(BSC)":2},"DIS":{"BEP20(BSC)":4},"TBP":{"ERC20":1000},"INTL":{"BEP20(BSC)":15},"PENDLE":{"ERC20":22,"ARBITRUM ONE":1},"GRT":{"ERC20":180},"WFAI":{"ERC20":3000000000},"RDNT":{"ARBITRUM ONE":6,"BEP20(BSC)":8},"5MC":{"MATIC":0.002},"LFI":{"ERC20":20},"UNI":{"ERC20":5},"ZBU":{"ERC20":40,"BEP20(BSC)":2},"LAMBO":{"ERC20":3000000},"HOPPY":{"ERC20":5000000000},"CMCX":{"ERC20":20000,"BEP20(BSC)":1500,"TRC20":1600},"CVX":{"ERC20":5},"CAST":{"ERC20":260},"STG":{"BEP20(BSC)":5,"ERC20":40,"FANTOM":7},"G":{"MATIC":300},"DEBT":{"BEP20(BSC)":0.2},"SPELL":{"ERC20":40000},"ADIL":{"ADIL":3},"OKB":{"ERC20":1},"BISKIT":{"C-CHAIN":10},"WOOO":{"ERC20":35000},"UCX":{"ERC20":400},"L":{"ERC20":6000000},"BSW":{"BEP20(BSC)":20},"BTC":{"BTC":0,"BTCTRON":0.0008},"LHINU":{"ERC20":400000},"ORDA":{"ERC20":1},"RIWA":{"ERC20":4000000},"EVY":{"ERC20":60},"GDCC":{"GDCC":0.2},"SHR":{"BEP20(BSC)":30000000},"LAZIO":{"BEP20(BSC)":1},"WOLF":{"ERC20":3000},"SNX":{"ERC20":10},"MTRM":{"ERC20":200},"GBEX":{"XDC":10000000},"APE":{"ERC20":8},"ATOM":{"ATOM":0.1},"BOB1":{"ERC20":600000},"EDAT":{"MATIC":1},"BRG":{"BEP20(BSC)":4000},"LDO":{"ERC20":16},"TRA":{"ERC20":20},"INEDIBLE":{"ERC20":4600000000},"NVIR":{"ERC20":700},"FAMEG":{"ERC20":82},"BONK":{"SOLANA":1500000},"PRI":{"BEP20(BSC)":0.6},"4CHAN":{"ERC20":500000000000000},"TON":{"TON":1},"METIS":{"ERC20":1.2},"BADGER":{"ERC20":10},"TAMA":{"ERC20":1300},"SHIB2":{"ERC20":1300000000},"BP":{"KLAY":0.5},"GAL":{"ERC20":18,"BEP20(BSC)":2},"PEPE":{"ERC20":14000000},"JBC":{"ERC20":13},"FSC":{"ERC20":15},"BOBO":{"ERC20":110000000},"KINGSHIB":{"BEP20(BSC)":800},"FLOKI":{"ERC20":600000},"CIC":{"CIC":10},"X":{"ERC20":30000000000},"EPX":{"BEP20(BSC)":10000},"ENS":{"ERC20":2},"PERP":{"ERC20":48},"FIS":{"ERC20":80},"SCLP":{"BEP20(BSC)":10},"BONE":{"ERC20":36},"XTZ":{"TEZOS":1,"BEP20(BSC)":3},"NOAH":{"TRC20":3},"GALA":{"ERC20":520},"APRIL":{"BEP20(BSC)":55},"SYLMYDID":{"BEP20(BSC)":4000},"PIG2":{"ERC20":30000000000},"LADYS":{"ERC20":600000000},"XDC":{"XDC":70},"OMG":{"ERC20":30},"FUMO":{"ERC20":0.0005},"USDC1":{"ERC20":20000000},"IMGNAI":{"ERC20":1000},"LIFE":{"ERC20":350 },"GHUB":{"KLAY":15},"HOOK":{"BEP20(BSC)":2},"FWC":{"BEP20(BSC)":100000000000},"BYK":{"BEP20(BSC)":1},"LOVE":{"ERC20":980},"CHEEL":{"BEP20(BSC)":0.1},"ELMO":{"ERC20":1160},"COT":{"ERC20":1600},"GSL":{"MATIC":1},"MSQ":{"MATIC":0.5},"UMA":{"ERC20":6},"CSC":{"XRP":4000},"EPIX":{"BEP20(BSC)":120},"PCE":{"ERC20":2400},"RFD":{"ERC20":2000000},"WPEPE":{"ERC20":20000},"ILV":{"ERC20":0.06},"LINK":{"ERC20":3},"PRX":{"BEP20(BSC)":4},"DBC":{"ERC20":200},"PSYOP":{"ERC20":20000},"CTY":{"BEP20(BSC)":0.1},"NUM":{"BEP20(BSC)":15,'NUM':20},}

module.exports = { binanceFee, mexcFee, bybitFee, gateIoFee, lbankFee, kucoinFee, okxFee,     fullNameFromCMCArr, gateIoNetworkObj, mexcNetworkObj, lbankFeeObj}