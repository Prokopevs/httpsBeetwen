
const createStrForTG = (chain) => {
    const symbol = `🟡 ${chain.symbol} [[${chain.names[0]} | ${chain.names[1]}]]\n\n`

    const byFrom = `🏢| *${chain.buyFrom}* |\n`
    const priceInBuyExchange = `Цена: ${chain.avgPriceInBuyEx} [[${chain.pricesInBuyEx[0]}--${chain.pricesInBuyEx[1]}]]\n`
    const volumeInBuyExchange = `Объем: *${chain.maxDealInBuyEx}*💲, ${chain.valueInBuyEx}, ${chain.ordersInBuyEx} ${getEnding(chain.ordersInBuyEx)}\n\n`

    const sellTo = `🏣| *${chain.sellTo}* |\n`
    const priceInSellExchange = `Цена: ${chain.avgPriceInSellEx} [[${chain.pricesInSellEx[0]}--${chain.pricesInSellEx[1]}]]\n`
    const volumeInSellExchange = `Объем: *${chain.maxDealInSellEx}*💲, ${chain.valueInSellEx}, ${chain.ordersInSellEx} ${getEnding(chain.ordersInSellEx)}\n\n`

    const extraFee = chain.extraFee == 0 ? '\n' : ` / доп *${chain.extraFee}%*\n`
    const commission = `Комиссия: спот *${chain.totalFeeSpot}*💲 / перевод *${chain.feeWithdraw}*💲 (${chain.feeWithdrawInCoins} ${chain.baseAsset})${extraFee}` 

    const network = `🌐 Сеть: ${chain.withdrawInfo.firstTransferArr.network} `
    let thirdExchange = ''
    if(chain.withdrawInfo.secondTransferArr) {
        thirdExchange = `➡️ ${chain.withdrawInfo.betweenExchange} ➡️ ${chain.withdrawInfo.secondTransferArr.network}`
    }
    const spred = `\n💰 Чистый спред: *${chain.profitInUSDT}*💵 *(${chain.realPercent}%)*\n\n`
    let stablePrisesStr = ''
    for (let key in chain.stablePrices) {
        const oneStable = `${key}: ${chain.stablePrices[key]}💲`
        if(stablePrisesStr === '') {
            stablePrisesStr = stablePrisesStr + oneStable
        } else {
            stablePrisesStr = stablePrisesStr + ', ' + oneStable
        }
    }

    const str = symbol+byFrom+priceInBuyExchange+volumeInBuyExchange+sellTo+priceInSellExchange+volumeInSellExchange+commission+network+thirdExchange+spred+stablePrisesStr
    return str
}


function getEnding(number) {
    if (number === 1) {
      return 'ордер';
    } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
      return 'ордера';
    } else {
      return 'ордеров';
    }
  }

module.exports = { createStrForTG }
