let { binanceFee,  } = require('./feeData')
let { getFeeBinance } = require('./GetFee/getFeeBinance')

const fetchAllFees = async() => {
    console.log('запрос на Fee...')
    await Promise.all([
        getFeeBinance(),

    ]).then(results => { 
        binanceFee.feeData = results[0]

    }) 
}

module.exports = { fetchAllFees };