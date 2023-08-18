const { temporary5minBlackArr } = require("../Data")
const { isWithdrawEnable } = require("../Fee/isWithdrawEnable")
const { checkSpred } = require("./checkSpred")
const { extraFeeFunc } = require("../Fee/extraFeeFunc")
let { spotFee } = require('./orderBookData')

const compareAsksAndBids = (orders, requestedCoinsArr, status) => {
    for(let i=0; i<orders.length; i++) {
        const asks = orders[i][0].asks
        const bids = orders[i][1].bids
        const asksInSellArrForFee = orders[i][1].asks

        const buyArr = []
        let askCount = 0
        let bidsCount = 0

        let sumUSDT = 0
        let sumSellUSDT = 0
        let sumQty = 0
        let sumUSDTInSellEXchange
        let generalUSDTSpred = 0

        const buyExchangeName = requestedCoinsArr[i].buyFrom              // 'mexc'
        const sellExchangeName = requestedCoinsArr[i].sellTo                // 'binance'
        const extraFeeBuy = extraFeeFunc(buyExchangeName, requestedCoinsArr[i], 'buy')
        const extraFeeSell = extraFeeFunc(sellExchangeName, requestedCoinsArr[i], 'sell')
        const sumExtraFee = Number(extraFeeBuy) + Number(extraFeeSell)

        for(let j=0; j<asks.length; j++) {
            const priceInAskArr = Number(asks[j][0])
            const qtyInAskArr = Number(asks[j][1])

            for(let k=0; k<bids.length; k++) { 
                const priceInBidsArr = Number(bids[k][0])
                const qtyInBidsArr = Number(bids[k][1])

                const spred = priceInBidsArr*100/priceInAskArr-100

                if(spred >= 0.3+sumExtraFee) {
                    // случай 1
                    if(qtyInAskArr < qtyInBidsArr) {
                        const left = qtyInBidsArr-qtyInAskArr
                        
                        const newBidsElem = [bids[k][0], String(left)]
                        bids.splice(k, 1, newBidsElem)
                        askCount++                                          // исполнило аску
                        
                        const sum = priceInAskArr*qtyInAskArr               
                        sumUSDT += sum                                        // для avarageBuyPrice
                        sumSellUSDT += priceInBidsArr*qtyInAskArr            // для avarageSellPrice
                        sumQty += qtyInAskArr                               // avarageBuyPrice и avarageSellPrice делим на sumQty
                        
                        generalUSDTSpred = generalUSDTSpred + (sum*spred/100)   // сколько можно заработать
                        
                        const obj = {spred, priceInAskArr, qty: qtyInAskArr, priceInBidsArr, sum, left}
                        buyArr.push(obj)
                        break
                    }

                    // случай 2 и 3
                    if(qtyInBidsArr <= qtyInAskArr) {
                        const left = qtyInAskArr - qtyInBidsArr
                        
                        if(left !== 0) {
                            const newAskElem = [asks[j][0], String(left)]
                            asks.splice(j, 1, newAskElem)
                            j--
                        } else {
                            askCount++
                        }
                        
                        bids.splice(k, 1)
                        bidsCount++
                        
                        const sum = priceInAskArr*qtyInBidsArr
                        sumUSDT += sum
                        sumSellUSDT += priceInBidsArr*qtyInBidsArr
                        sumQty += qtyInBidsArr
                        
                        generalUSDTSpred = generalUSDTSpred + (sum*spred/100)
                        
                        const obj = {spred, priceInAskArr, qty: qtyInBidsArr, priceInBidsArr, sum, left: 0}

                        buyArr.push(obj)
                        break
                    }
                }
            }
        }

        //---------------------BlackList 1-------------------------//
        if(status === 'ordinary') { // спатус ordinary когда идут простые запросы и в них проверяем что профит нужен больше 1
            if(generalUSDTSpred < 1) {            // если профит меньше 0.7 долларов без учета коммисии
                requestedCoinsArr[i].blockingTime = new Date() // сохраняем время блокировки
                requestedCoinsArr[i].timeInBlock = 5
                temporary5minBlackArr.data.push(requestedCoinsArr[i]) // пушим в 5 минутный блокировочный массив
                continue
            }
        }
        //----------------------------------------------------------//
        const avarageBuyPrice = (sumUSDT/sumQty)
        const avarageSellPrice = (sumSellUSDT/sumQty)
        if(buyArr[buyArr.length-1]?.left == 0) {
            askCount = askCount+1
            sumUSDTInSellEXchange = sumUSDT
        } else {
            bidsCount = bidsCount+1
            sumUSDTInSellEXchange = buyArr[buyArr.length-1]?.left * buyArr[buyArr.length-1]?.priceInAskArr + sumUSDT
        }

        let spotFeeInBuyExchange = spotFee[buyExchangeName] + extraFeeBuy
        let spotFeeInSellExchange = spotFee[sellExchangeName] + extraFeeSell


        //------------------------Fee----------------------------//
        let transferInfo
        if(status === 'ordinary') {
            transferInfo = requestedCoinsArr[i].transferInfo
        } else {
            transferInfo = isWithdrawEnable(requestedCoinsArr[i])
        }

        let commissionForWithdraw = 0
        if(transferInfo.data?.betweenExchange) { // перевод через последника
            commissionForWithdraw = Number(transferInfo.data.firstTransferArr.fee) + Number(transferInfo.data.secondTransferArr.fee)
        } else if(transferInfo.data?.allNetworks) { // перевод без последника
            commissionForWithdraw = Number(transferInfo.data.firstTransferArr.fee)
        }

        // const sumQtyLength = getLength(sumQty)
        const feeSpotInSellExForWithoutWithdrawFeeUSDT = (sumQty*spotFeeInSellExchange/100) * Number(asksInSellArrForFee[0][0]) // комиссия в долларах 0.1% за продажу для случая когда считаем generalUSDTSpredWithoutWithdrawFee

        const feeForSpotInBuyExchange = sumQty*spotFeeInBuyExchange/100   // коммисия в монетах 0.1% за покупку
        const sumQtyWithFeeForBuy = sumQty - feeForSpotInBuyExchange      // количество монет после отнятия комммисии за покупку(0.1%)

        const sumQtyAfterTransfer = sumQtyWithFeeForBuy - commissionForWithdraw // количество монет после отправки
        const feeForSpotInSellExchange = sumQtyAfterTransfer*spotFeeInSellExchange/100 // комиссия 0.1% за продажу

        const feeForSpotInBuyExchangeUSDT = feeForSpotInBuyExchange * Number(asks[0][0])
        const feeForWithdrawUSDT = commissionForWithdraw * Number(asks[0][0])
        const feeForSpotInSellExchangeUSDT = feeForSpotInSellExchange * Number(asksInSellArrForFee[0][0]) 

        const totalFeeSpotUSDT = feeForSpotInBuyExchangeUSDT+feeForSpotInSellExchangeUSDT // объщая комиссия за спот ордера (0.1+0.1)
        const totalFee = totalFeeSpotUSDT+feeForWithdrawUSDT //общая комиссия за все действия

        const generalUSDTSpredWithoutWithdrawFee = generalUSDTSpred-feeForSpotInBuyExchangeUSDT-feeSpotInSellExForWithoutWithdrawFeeUSDT 
        // прибыль если не выводить монеты, а отдавать только за спот 0.1%
        generalUSDTSpred = generalUSDTSpred-totalFee        // вычитаем из зароботка комиссию
        let avaragePercent = generalUSDTSpred*100/sumUSDT

        //---------------------StablePrices-----------------------//
        const arrSums = [50, 75, 100, 125, 150, 200]
        const sumObj = {}
        for(let i=0; i<arrSums.length; i++) {
            let dollars = arrSums[i] // 50
            let profit = 0
            const feeInBuyEx = arrSums[i]*spotFeeInBuyExchange/100
            const feeInSellEx = (arrSums[i]-feeInBuyEx)*spotFeeInSellExchange/100
            const generalFeeStable = feeInBuyEx+feeInSellEx+feeForWithdrawUSDT
            
            for(let j=0; j<buyArr.length; j++) {
                let sum = Number(buyArr[j].sum)
                if(dollars <= sum) {
                    profit += dollars*buyArr[j].spred/100
                    dollars = 0
                    break
                } else {
                    const left = dollars - sum
                    dollars = left
                    profit += sum*buyArr[j].spred/100
                }
            }
            if(dollars == 0) {
                const realProfit = profit-generalFeeStable
                const realPercent = realProfit*100/arrSums[i]
                if(realPercent>0.2) { 
                    sumObj[arrSums[i]] = Number(realProfit.toFixed(3))
                }
            } 
        }

        //-----------------------Log-----------------------------//
        let avarageCutBuyPrice
        let avarageCutSellPrice
        if(String(buyArr[0]?.priceInAskArr).includes('e')) {
            const eArrBuyPrice = String(avarageBuyPrice).split('e') // [ '7.9432237', '-7' ]
            const eArrSellPrice = String(avarageSellPrice).split('e') 
            eArrBuyPrice.splice(0, 1, Number(eArrBuyPrice[0]).toFixed(4)) // [ '7.9443', '-7' ]
            eArrSellPrice.splice(0, 1, Number(eArrSellPrice[0]).toFixed(4))
            avarageCutBuyPrice = eArrBuyPrice.join('e')  // 7.9443e-7
            avarageCutSellPrice = eArrSellPrice.join('e')
        } else {
            const priceLengthInBuyExchange = getLength(buyArr[0]?.priceInAskArr)
            const priceLengthInSellExchange = getLength(buyArr[0]?.priceInBidsArr)
            avarageCutBuyPrice = avarageBuyPrice.toFixed(priceLengthInBuyExchange)
            avarageCutSellPrice = avarageSellPrice.toFixed(priceLengthInSellExchange)
        }
        
        let currentObj = requestedCoinsArr[i]
        currentObj.profitInUSDT = generalUSDTSpred.toFixed(3)
        currentObj.realPercent = avaragePercent.toFixed(3)

        currentObj.avgPriceInBuyEx = avarageCutBuyPrice
        currentObj.pricesInBuyEx = [buyArr[0]?.priceInAskArr, buyArr[buyArr.length-1]?.priceInAskArr]
        currentObj.maxDealInBuyEx = sumUSDT.toFixed(3)
        currentObj.valueInBuyEx = Number(sumQtyWithFeeForBuy.toFixed(4))  //было sumQtyLength
        currentObj.ordersInBuyEx = askCount

        currentObj.avgPriceInSellEx = avarageCutSellPrice
        currentObj.pricesInSellEx = [buyArr[0]?.priceInBidsArr, buyArr[buyArr.length-1]?.priceInBidsArr]
        currentObj.maxDealInSellEx = sumUSDTInSellEXchange.toFixed(3)
        currentObj.valueInSellEx = Number(sumQtyAfterTransfer.toFixed(4))
        currentObj.ordersInSellEx = bidsCount

        currentObj.totalFeeSpot = totalFeeSpotUSDT.toFixed(2)
        currentObj.feeWithdraw = feeForWithdrawUSDT.toFixed(2)
        currentObj.feeWithdrawInCoins = commissionForWithdraw.toString()
        currentObj.extraFee = sumExtraFee
        currentObj.profitInUSDTIfNotWithdraw = generalUSDTSpredWithoutWithdrawFee.toFixed(3)

        currentObj.stablePrices = sumObj
        currentObj.withdrawInfo = transferInfo.data
        currentObj.availableWithdraw = transferInfo.availableWithdraw
        currentObj.availableDeposit = transferInfo.availableDeposit
        
        if(status === 'refetch') { // если нажали на кнопку обновить
            return requestedCoinsArr[i]
        } else {
            checkSpred(requestedCoinsArr[i])
        }
    }
}

const getLength = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) ) // вернёт колич знаков после запятой



module.exports = { compareAsksAndBids }
