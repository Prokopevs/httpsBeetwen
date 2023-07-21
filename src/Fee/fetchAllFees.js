let { getFeeBinance } = require('./GetFee/getFeeBinance')
let { getFeeMexc } = require('./GetFee/getFeeMexc')
let { getFeeBybit } = require('./GetFee/getFeeBybit')

const fetchAllFees = async() => {
    console.log('запрос на Fee...')
    await Promise.all([
        getFeeBinance(),
        getFeeMexc(),
        getFeeBybit(),
    ])
}

module.exports = { fetchAllFees };