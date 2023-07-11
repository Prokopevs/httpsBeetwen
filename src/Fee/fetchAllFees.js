let { binanceFee, mexcFee, } = require('./feeData')
let { getFeeBinance } = require('./GetFee/getFeeBinance')
let { getFeeMexc } = require('./GetFee/getFeeMexc')

const fetchAllFees = async() => {
    console.log('запрос на Fee...')
    await Promise.all([
        getFeeBinance(),
        getFeeMexc(),

    ]).then(results => { 
        binanceFee.feeData = results[0]
        mexcFee.feeData = results[1]

    }) 
}

module.exports = { fetchAllFees };