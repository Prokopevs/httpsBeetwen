const { searchLargestSubstr } = require('../Utils/searchLargestSubstr')
let { binanceFee, mexcFee, bibitFee } = require('./feeData')

const isWithdrawEnable = (obj) => {
    const unicNames = {
        'binance': ['networkList', 'name', 'depositEnable', 'withdrawEnable', 'withdrawFee'],
        'mexc': ['networkList', 'network', 'depositEnable', 'withdrawEnable', 'withdrawFee'],
        'bibit': ['networkList', 'network', 'depositEnable', 'withdrawEnable', 'withdrawFee']
    }
    
    const feeObj = {
        binance: binanceFee.feeData,
        mexc: mexcFee.feeData,
        bibit: bibitFee.feeData
    }
    const coinName = obj.baseAsset            // BTC
    const withdrawArr = feeObj[obj.buyFrom]   // feeObj['mexc'] 
    const depositArr = feeObj[obj.sellTo]     // feeObj['binance'] 

    const wordsInExchangeBuyArr = unicNames[obj.buyFrom]  // ['networkList', 'network', 'depositEnable', 'withdrawEnable', 'withdrawFee']
    const wordsInExchangeSellArr = unicNames[obj.sellTo]  // ['networkList', 'name', 'depositEnable', 'withdrawEnable', 'withdrawFee']

    const withdrawNetworkList = withdrawArr.find((elem) => elem.coin === coinName)?.[wordsInExchangeBuyArr[0]].filter((elem) => elem[wordsInExchangeBuyArr[3]] == true).sort((a, b) => parseFloat(a[wordsInExchangeBuyArr[4]]) - parseFloat(b[wordsInExchangeBuyArr[4]]))
    const depositNetworkList = depositArr.find((elem) => elem.coin === coinName)?.[wordsInExchangeSellArr[0]].filter((elem) => elem[wordsInExchangeSellArr[2]] == true)

    let NetworkArrAndFee
    if((withdrawNetworkList?.length && depositNetworkList?.length)) {
        NetworkArrAndFee = findChain(withdrawNetworkList, depositNetworkList, wordsInExchangeBuyArr, wordsInExchangeSellArr, obj.buyFrom, obj.sellTo)
    } else {
        console.log('не смог найти монету '+coinName+' в биржах '+obj.buyFrom+' '+obj.sellTo)
        return {}
    }

    // -----------------------------------------------------------------------------//
    if(NetworkArrAndFee.length==0) {
        let resultObj = {}
        let commission = null
        let allExchanges = []

        for (let key in feeObj) {
            if(key==obj.buyFrom || key == obj.sellTo) {
                continue
            }
            const exchangeArr = feeObj[key]   // [.....] много объектов с информацией о fee и.т.д
            const wordsInThirdExcArr = unicNames[key] // ['networkList', 'network', 'depositEnable', 'withdrawEnable', 'withdrawFee']

            const withdrawExchangeArr = exchangeArr.find((elem) => elem.coin === coinName)?.[wordsInThirdExcArr[0]].filter((elem) => elem[wordsInThirdExcArr[3]] == true)
            const depositExchangeArr = exchangeArr.find((elem) => elem.coin === coinName)?.[wordsInThirdExcArr[0]].filter((elem) => elem[wordsInThirdExcArr[2]] == true)

            if(withdrawExchangeArr?.length==0 || depositExchangeArr?.length==0) continue 
            if(!withdrawExchangeArr || !depositExchangeArr) continue 

            const firstWithDrawFee = findChain(withdrawNetworkList, depositExchangeArr, wordsInExchangeBuyArr, wordsInThirdExcArr, obj.buyFrom, obj.sellTo).sort((a,b) => parseFloat(a.fee) - parseFloat(b.fee))
            let secondWithDrawFee
            if(firstWithDrawFee.length) {
                secondWithDrawFee = findChain(withdrawExchangeArr, depositNetworkList, wordsInThirdExcArr, wordsInExchangeSellArr, obj.buyFrom, obj.sellTo).sort((a,b) => parseFloat(a.fee) - parseFloat(b.fee))

                if(secondWithDrawFee.length) {
                    allExchanges.push(key)
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

        if(allExchanges.length) resultObj.allExchanges = allExchanges
        // console.log(resultObj)
        return resultObj
    } 
    // -----------------------------------------------------------------------------//


    const allNetworks = NetworkArrAndFee.map((elem) => {  // [ERC20, BEP20]
        return elem.network
    })
    const finalObj = {
        firstTransferArr: NetworkArrAndFee[0],
        allNetworks
    }
    // console.log(finalObj)
    // console.log(withdrawNetworkList)
    // console.log(depositNetworkList)
    // console.log('---------------------------')
    return finalObj
}



const findChain = (withdrawNetworkList, depositNetworkList, wordsInExchangeBuyArr, wordsInExchangeSellArr, buyFrom, sellTo) => {
    const NetworkArrAndFee = []
    for(let i=0; i<withdrawNetworkList.length; i++) {
         const OutNetwork = networkName(withdrawNetworkList[i], wordsInExchangeBuyArr[1], buyFrom) // BEP20

        for(let j=0; j<depositNetworkList.length; j++) {
            const InNetwork = networkName(depositNetworkList[j], wordsInExchangeSellArr[1], sellTo) // BEP20
            const sameString = searchLargestSubstr([OutNetwork, InNetwork])
            if(sameString.length>2) {
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
        const Network = withdrawOrDepositNetwork[wordInExchangeBuyOrSellArr].toUpperCase()+' '+withdrawOrDepositNetwork.network.toUpperCase()
        return Network
    } else {
        const Network = withdrawOrDepositNetwork[wordInExchangeBuyOrSellArr].toUpperCase()
        return Network
    }
}


module.exports = { isWithdrawEnable };