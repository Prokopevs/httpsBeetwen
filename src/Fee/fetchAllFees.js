let { getFeeBinance } = require('./GetFee/getFeeBinance')
let { getFeeMexc } = require('./GetFee/getFeeMexc')
let { getFeeBybit } = require('./GetFee/getFeeBybit')
const { getFeeGateIo } = require('./GetFee/getFeeGateIo')
const { getFeeLBank } = require('./GetFee/getFeeLBank')
const { getFeeKuCoin } = require('./GetFee/getFeeKuCoin')
const { getFeeOKX } = require('./GetFee/getFeeOKX')
const { getFeeBitget } = require('./GetFee/getFeeBitget')
const { getFeeHuobi } = require('./GetFee/getFeeHuobi')
const { getFeePoloniex } = require('./GetFee/getFeePoloniex')
const { getFeeBitMart } = require('./GetFee/getFeeBitMart')
let attemptsCount = 0

const fetchAllFees = async () => {
    console.log('запрос на Fee...')
    try{
        await Promise.all([
            getFeeBinance(),
            getFeeMexc(),
            getFeeBybit(),
            getFeeGateIo(),
            getFeeLBank(),
            getFeeKuCoin(),
            getFeeOKX(),
            getFeeBitget(),
            getFeeHuobi(),
            getFeePoloniex(),
            getFeeBitMart(),
        ])
    } catch {
        if(attemptsCount < 2) {
            attemptsCount++
            await fetchAllFees()
        }
    }
    
}

module.exports = { fetchAllFees };