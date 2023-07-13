

const compareAsksAndBids = (orders, requestedCoinsArr) => {
    let count = 0

    for(let i=0; i<orders.length; i+=2) {
        const asks = orders[i].asks
        const bids = orders[i+1].bids

        const arr = [50, 100, 150, 200, 250]
        const buyArr = []
        let askCount = 0
        let bidsCount = 0

        let sumUSDT = 0
        let sumSellUSDT = 0
        let sumQty = 0
        let sumUSDTInSellEXchange

        let generalUSDTSpred = 0
        let generalPercentSpred = []

        for(let j=0; j<asks.length; j++) {
            const priceInAskArr = Number(asks[j][0])
            const qtyInAskArr = Number(asks[j][1])

            for(let k=0; k<bids.length; k++) { 
                const priceInBidsArr = Number(bids[k][0])
                const qtyInBidsArr = Number(bids[k][1])

                const spred = priceInBidsArr*100/priceInAskArr-100

                if(spred >= 0.2) {
                    // случай 1
                    if(qtyInAskArr < qtyInBidsArr) {
                        const left = qtyInBidsArr-qtyInAskArr
                        
                        const newBidsElem = [bids[k][0], String(left)]
                        bids.splice(k, 1, newBidsElem)
                        askCount++                                          // исполнило аску
                        
                        const sum = priceInAskArr*qtyInAskArr               
                        sumUSDT +=sum                                        // для avarageBuyPrice
                        sumSellUSDT += priceInBidsArr*qtyInAskArr            // для avarageSellPrice
                        sumQty += qtyInAskArr                               // avarageBuyPrice и avarageSellPrice делим на sumQty
                        
                        generalUSDTSpred = generalUSDTSpred + (sum*spred/100)   // сколько можно заработать
                        generalPercentSpred.push(spred)                         // средний процент заработка
                        
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
                        sumUSDT +=sum
                        sumSellUSDT += priceInBidsArr*qtyInBidsArr
                        sumQty += qtyInBidsArr
                        
                        generalUSDTSpred = generalUSDTSpred + (sum*spred/100)
                        generalPercentSpred.push(spred)
                        
                        const obj = {spred, priceInAskArr, qty: qtyInBidsArr, priceInBidsArr, sum, left: 0}

                        buyArr.push(obj)
                        break
                    }
                }
            }
        }
        
        const avarageBuyPrice = (sumUSDT/sumQty)
        const avarageSellPrice = (sumSellUSDT/sumQty)
        if(buyArr[buyArr.length-1].left == 0) {
            askCount = askCount+1
            sumUSDTInSellEXchange = sumUSDT
        } else {
            bidsCount = bidsCount+1
            sumUSDTInSellEXchange = buyArr[buyArr.length-1].left * buyArr[buyArr.length-1].priceInAskArr + sumUSDT
        }

        let avaragePercent = generalPercentSpred.reduce((a, b) => a + b, 0)/generalPercentSpred.length

        //--------------------------------------------------------//

        console.log(requestedCoinsArr[count])

        console.log('+'+(generalUSDTSpred).toFixed(4)+'$'+'('+avaragePercent.toFixed(4)+'%'+')')
        console.log('BuyFrom: '+requestedCoinsArr[count].buyFrom)
        console.log('price: '+avarageBuyPrice+" ["+buyArr[0].priceInAskArr+'-'+buyArr[buyArr.length-1].priceInAskArr+']')
        console.log('value: '+(sumUSDT).toFixed(4)+'$'+', '+askCount+ ' orders')
        console.log(' ')

        console.log('SellTo: '+requestedCoinsArr[count].sellTo)
        console.log('price: '+avarageSellPrice+" ["+buyArr[0].priceInBidsArr+'-'+buyArr[buyArr.length-1].priceInBidsArr+']')
        console.log('value: '+(sumUSDTInSellEXchange).toFixed(4)+'$'+', '+bidsCount+ ' orders')

        console.log('-----------------------------------')
        count++
    }
}



module.exports = { compareAsksAndBids }