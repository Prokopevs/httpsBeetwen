const { isWithdrawEnable } = require("../Fee/isWithdrawEnable")
const { logEvents } = require("../middleware/logger")
let { spotFee } = require('./orderBookData')

const compareAsksAndBids = (orders, requestedCoinsArr) => {
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

        for(let j=0; j<asks.length; j++) {
            const priceInAskArr = Number(asks[j][0])
            const qtyInAskArr = Number(asks[j][1])

            for(let k=0; k<bids.length; k++) { 
                const priceInBidsArr = Number(bids[k][0])
                const qtyInBidsArr = Number(bids[k][1])

                const spred = priceInBidsArr*100/priceInAskArr-100

                if(spred >= 0.4) {
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

        //---------------------BlackList-------------------------//
        if(generalUSDTSpred < 0.9) {            // также добавить в черный список на время
            console.log(generalUSDTSpred.toFixed(2) + ' не прошёл '+ requestedCoinsArr[i].symbol)
            continue
        }
        console.log('прошёл '+ requestedCoinsArr[i].symbol)


        const avarageBuyPrice = (sumUSDT/sumQty)
        const avarageSellPrice = (sumSellUSDT/sumQty)
        if(buyArr[buyArr.length-1].left == 0) {
            askCount = askCount+1
            sumUSDTInSellEXchange = sumUSDT
        } else {
            bidsCount = bidsCount+1
            sumUSDTInSellEXchange = buyArr[buyArr.length-1].left * buyArr[buyArr.length-1].priceInAskArr + sumUSDT
        }


        //------------------------Fee----------------------------//
        const transferInfo = isWithdrawEnable(requestedCoinsArr[i])

        let commissionForWithdraw = 0
        if(transferInfo?.betweenExchange) { // перевод через последника
            commissionForWithdraw = Number(transferInfo.firstTransferArr.fee) + Number(transferInfo.secondTransferArr.fee)
        } else if(transferInfo?.allNetworks) { // перевод без последника
            commissionForWithdraw = Number(transferInfo.firstTransferArr.fee)
        }

        const sumQtyLength = getLength(sumQty)
        const buyExchangeName = requestedCoinsArr[i].buyFrom              // 'mexc'
        const feeForSpotInBuyExchange = sumQty*spotFee[buyExchangeName]/100   // коммисия 0.1% за покупку
        const sumQtyWithFeeForBuy = sumQty - feeForSpotInBuyExchange          // количество монет после отнятия комммисии за покупку(0.1%)

        const sumQtyAfterTransfer = sumQtyWithFeeForBuy - commissionForWithdraw // количество монет после отправки
        const sellExchangeName = requestedCoinsArr[i].sellTo                // 'binance'
        const feeForSpotInSellExchange = sumQtyAfterTransfer*spotFee[sellExchangeName]/100 // комиссия 0.1% за продажу

        const feeForSpotInBuyExchangeUSDT = feeForSpotInBuyExchange * Number(asks[0][0])
        const feeForWithdrawUSDT = commissionForWithdraw * Number(asks[0][0])
        const feeForSpotInSellExchangeUSDT = feeForSpotInSellExchange * Number(asksInSellArrForFee[0][0]) 
        const totalFeeSpotUSDT = feeForSpotInBuyExchangeUSDT+feeForSpotInSellExchangeUSDT // объщая комиссия за спот ордера (0.1+0.1)
        const totalFee = totalFeeSpotUSDT+feeForWithdrawUSDT //общая комиссия за все действия

        const generalUSDTSpredWithoutWithdrawFee = generalUSDTSpred - feeForSpotInBuyExchangeUSDT - (feeForSpotInBuyExchange* Number(asksInSellArrForFee[0][0])) // прибыль если не выводить монеты, а отдавать только за спот 0.1%
        generalUSDTSpred = generalUSDTSpred-totalFee        // вычитаем из зароботка комиссию
        let avaragePercent = generalUSDTSpred*100/sumUSDT

    

        //---------------------StablePrices-----------------------//
        const arrSums = [50, 100, 150, 200, 250]
        const sumObj = {}
        for(let i=0; i<arrSums.length; i++) {
            let dollars = arrSums[i] // 50
            let profit = 0
            const feeInBuyEx = arrSums[i]*spotFee[buyExchangeName]/100
            const feeInSellEx = (arrSums[i]-feeInBuyEx)*spotFee[sellExchangeName]/100
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
                if(realProfit>0.01) {    // изменить на нормаьное число
                    sumObj[arrSums[i]] = Number(realProfit.toFixed(3))
                }
            } 
        }
        //-----------------------Log-----------------------------//
        const priceLengthInBuyExchange = getLength(buyArr[0].priceInAskArr)
        const priceLengthInSellExchange = getLength(buyArr[0].priceInBidsArr)

        let currentObj = requestedCoinsArr[i]
        currentObj.profitInUSDT = generalUSDTSpred.toFixed(3) + '$'
        currentObj.realPercent = avaragePercent.toFixed(3) + '%'

        currentObj.avgPriceInBuyEx = avarageBuyPrice.toFixed(priceLengthInBuyExchange)
        currentObj.pricesInBuyEx = '['+buyArr[0].priceInAskArr+'-'+buyArr[buyArr.length-1].priceInAskArr+']'
        currentObj.maxDealInBuyEx = sumUSDT.toFixed(3) + '$'
        currentObj.valueInBuyEx = Number(sumQtyWithFeeForBuy.toFixed(sumQtyLength))
        currentObj.ordersInBuyEx = askCount

        currentObj.avgPriceInSellEx = avarageSellPrice.toFixed(priceLengthInSellExchange)
        currentObj.pricesInSellEx = '['+buyArr[0].priceInBidsArr+'-'+buyArr[buyArr.length-1].priceInBidsArr+']'
        currentObj.maxDealInSellEx = sumUSDTInSellEXchange.toFixed(3) + '$'
        currentObj.valueInSellEx = Number(sumQtyAfterTransfer.toFixed(sumQtyLength))
        currentObj.ordersInSellEx = bidsCount

        currentObj.totalFeeSpot = totalFeeSpotUSDT
        currentObj.feeWithdraw = feeForWithdrawUSDT
        currentObj.profitInUSDTIfNotWithdraw = generalUSDTSpredWithoutWithdrawFee

        currentObj.stablePrices = sumObj
        currentObj.withdrawInfo = transferInfo
        console.log(requestedCoinsArr[i])

        // logEvents(JSON.stringify(requestedCoinsArr[count]), 'coins.log')
    }
}

const getLength = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) ) // вернёт колич знаков после запятой



module.exports = { compareAsksAndBids }