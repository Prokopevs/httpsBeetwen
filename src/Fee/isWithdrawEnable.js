const { searchLargestSubstr } = require('../Utils/searchLargestSubstr')
const { checkSameStr } = require('./checkSameStr')
let { binanceFee, mexcFee, bybitFee, gateIoFee, lbankFee, kucoinFee, okxFee, bitgetFee, huobiFee, poloniexFee, bitmartFee} = require('./feeData')

const isWithdrawEnable = (obj) => {
    const unicNames = {
        'binance': ['networkList', 'name', 'depositEnable', 'withdrawEnable', 'withdrawFee'],
        'mexc': ['networkList', 'network', 'depositEnable', 'withdrawEnable', 'withdrawFee'],
        'bybit': ['chains', 'chainType', 'depositEnable', 'withdrawEnable', 'withdrawFee'],
        'gateIo': ['networkList', 'network', 'depositEnable', 'withdrawEnable', 'withdrawFee'],
        'coinbase': ['networkList', 'network', 'depositEnable', 'withdrawEnable', 'withdrawFee'],
        'lbank': ['networkList', 'name', 'depositEnable', 'withdrawEnable', 'withdrawFee'],
        'kucoin': ['chains', 'chainName', 'isDepositEnabled', 'isWithdrawEnabled', 'withdrawalMinFee'],
        'okx': ['networkList', 'network', 'depositEnable', 'withdrawEnable', 'withdrawFee'],
        'bitget': ['chains', 'chain', 'rechargeable', 'withdrawable', 'withdrawFee'],
        'huobi': ['chains', 'network', 'depositStatus', 'withdrawStatus', 'withdrawFee'],
        'poloniex': ['networkList', 'blockchain', 'depositEnable', 'withdrawalEnable', 'withdrawFee'],
        'bitmart': ['networkList', 'network', 'depositEnable', 'withdrawEnable', 'withdrawFee'],
    }

    const feeObj = {
        binance: binanceFee.feeData,
        mexc: mexcFee.feeData,
        bybit: bybitFee.feeData,
        gateIo: gateIoFee.feeData,
        coinbase: [],
        lbank: lbankFee.feeData,
        kucoin: kucoinFee.feeData,
        okx: okxFee.feeData,
        bitget: bitgetFee.feeData,
        huobi: huobiFee.feeData,
        poloniex: poloniexFee.feeData,
        bitmart: bitmartFee.feeData,
    }
    const coinName = obj.baseAsset            // BTC
    const withdrawArr = feeObj[obj.buyFrom]   // feeObj['mexc'] 
    const depositArr = feeObj[obj.sellTo]     // feeObj['binance'] 

    const wordsInExchangeBuyArr = unicNames[obj.buyFrom]  // ['networkList', 'network', 'depositEnable', 'withdrawEnable', 'withdrawFee']
    const wordsInExchangeSellArr = unicNames[obj.sellTo]  // ['networkList', 'name', 'depositEnable', 'withdrawEnable', 'withdrawFee']

    //1) находим в массиве fee монету(btc) 2)фильтруем массив network по withdrawEnable==true 3)сортируем по withdrawFee
    let withdrawNetworkList = withdrawArr.find((elem) => elem.coin === coinName)?.[wordsInExchangeBuyArr[0]].filter((elem) => elem[wordsInExchangeBuyArr[3]] == true).sort((a, b) => parseFloat(a[wordsInExchangeBuyArr[4]]) - parseFloat(b[wordsInExchangeBuyArr[4]]))
    let depositNetworkList = depositArr.find((elem) => elem.coin === coinName)?.[wordsInExchangeSellArr[0]].filter((elem) => elem[wordsInExchangeSellArr[2]] == true)

    if(withdrawNetworkList === undefined) withdrawNetworkList = []
    if(depositNetworkList === undefined) depositNetworkList = []

    const AvailableNetworksInWithdrawArr = withdrawNetworkList.map((elem) => networkName(elem, wordsInExchangeBuyArr[1], obj.buyFrom))
    const AvailableNetworksInDepositArr = depositNetworkList.map((elem) => networkName(elem, wordsInExchangeSellArr[1], obj.sellTo))

    let NetworkArrAndFee
    if((withdrawNetworkList?.length && depositNetworkList?.length)) { // если нашли в биржах хоть какие либо networks(Важная проверка)
        NetworkArrAndFee = findChain(withdrawNetworkList, depositNetworkList, wordsInExchangeBuyArr, wordsInExchangeSellArr, obj.buyFrom, obj.sellTo) // может вернуться пустой массив если нет одикаковых networks
    } else {
        return {
            data: {},
            availableWithdraw: AvailableNetworksInWithdrawArr,
            availableDeposit: AvailableNetworksInDepositArr
        }
    }  // далее на 91 строчку

    // --------------------------------Кросс поиск в дургих биржах ---------------------------------------//
    if(NetworkArrAndFee.length==0) { // если нет одикаковых networks заходим сюда
        let resultObj = {}
        let commission = null
        let allExchanges = []

        for (let key in feeObj) {
            if(key==obj.buyFrom || key == obj.sellTo) { // не учитываем те котые пришли в родном объекте
                continue
            }

            const exchangeArr = feeObj[key]   // [.....] много объектов с информацией о fee и.т.д
            const wordsInThirdExcArr = unicNames[key] // ['networkList', 'network', 'depositEnable', 'withdrawEnable', 'withdrawFee']

            const withdrawExchangeArr = exchangeArr.find((elem) => elem.coin === coinName)?.[wordsInThirdExcArr[0]].filter((elem) => elem[wordsInThirdExcArr[3]] == true)
            const depositExchangeArr = exchangeArr.find((elem) => elem.coin === coinName)?.[wordsInThirdExcArr[0]].filter((elem) => elem[wordsInThirdExcArr[2]] == true)

            if(withdrawExchangeArr?.length==0 || depositExchangeArr?.length==0) continue // если длина рано 0
            if(!withdrawExchangeArr || !depositExchangeArr) continue // если undefined 

            const firstWithDrawFee = findChain(withdrawNetworkList, depositExchangeArr, wordsInExchangeBuyArr, wordsInThirdExcArr, obj.buyFrom, key).sort((a,b) => parseFloat(a.fee) - parseFloat(b.fee))
            let secondWithDrawFee
            if(firstWithDrawFee.length) { // если есть куда можно с 1 биржы перекунить в кросс биржу
                secondWithDrawFee = findChain(withdrawExchangeArr, depositNetworkList, wordsInThirdExcArr, wordsInExchangeSellArr, key, obj.sellTo).sort((a,b) => parseFloat(a.fee) - parseFloat(b.fee))

                if(secondWithDrawFee.length) { // если есть куда можно с кросс биржы перекинуть во 2 биржу
                    allExchanges.push(key) // все биржы с которыми можно крутануть кросс перевод
                    if(commission === null) {
                        commission = Number(firstWithDrawFee[0].fee) + Number(secondWithDrawFee[0].fee)
                        resultObj = {
                            firstTransferArr: firstWithDrawFee[0],
                            secondTransferArr: secondWithDrawFee[0],
                            betweenExchange: key
                        }
                    } else {
                        const newCommission = Number(firstWithDrawFee[0].fee) + Number(secondWithDrawFee[0].fee)
                        if(newCommission < commission) {
                            commission = newCommission
                            resultObj = {
                                firstTransferArr: firstWithDrawFee[0],
                                secondTransferArr: secondWithDrawFee[0],
                                betweenExchange: key
                            }
                        } 
                    }
                }

            } 
        }

        if(allExchanges.length) resultObj.allExchanges = allExchanges // если есть биржы с которыми можно крутануть кросс перевод
        
        return {
            data: resultObj,
            availableWithdraw: AvailableNetworksInWithdrawArr,
            availableDeposit: AvailableNetworksInDepositArr
        }
    } 
    // -----------------------------------------------------------------------------//


    const allNetworks = NetworkArrAndFee.map((elem) => {  // [ERC20, BEP20]
        return elem.network
    })
    const finalObj = {
        firstTransferArr: NetworkArrAndFee[0],
        allNetworks
    }
    return {
        data: finalObj,
        availableWithdraw: AvailableNetworksInWithdrawArr,
        availableDeposit: AvailableNetworksInDepositArr
    }
}


// ищёт чтобы нетворки назывались одним именем(BEP20) если нашёл пушит {network: sameString, fee: fee}, ...
const findChain = (withdrawNetworkList, depositNetworkList, wordsInExchangeBuyArr, wordsInExchangeSellArr, buyFrom, sellTo) => {
    const NetworkArrAndFee = []
    for(let i=0; i<withdrawNetworkList.length; i++) {
        const OutNetwork = networkName(withdrawNetworkList[i], wordsInExchangeBuyArr[1], buyFrom) // BEP20

        for(let j=0; j<depositNetworkList.length; j++) {
            const InNetwork = networkName(depositNetworkList[j], wordsInExchangeSellArr[1], sellTo) // BEP20
            let sameString = searchLargestSubstr([OutNetwork, InNetwork]) // сравниваем BNB Smart Chain(BEP20) с BEP20
            sameString = checkSameStr(sameString, OutNetwork, InNetwork)
            if(sameString.length>2) { // если нашли совпадение которое больше 2 символов
                const fee = withdrawNetworkList[i][wordsInExchangeBuyArr[4]]
                const successObj = {network: sameString, fee: fee}
                NetworkArrAndFee.push(successObj)
            }
        }
    }
    return NetworkArrAndFee
}

const networkName = (withdrawOrDepositNetwork, wordInExchangeBuyOrSellArr, exchange) => {
    if(exchange === 'binance') {
        // const Network = POLYGON + ' ' + MATIC
        const Network = withdrawOrDepositNetwork[wordInExchangeBuyOrSellArr].toUpperCase()+'/'+withdrawOrDepositNetwork.network.toUpperCase()
        return Network
    } else {
        const Network = withdrawOrDepositNetwork[wordInExchangeBuyOrSellArr].toUpperCase()
        return Network
    }
}


module.exports = { isWithdrawEnable };