let { getFeeBinance } = require('./GetFee/getFeeBinance')
let { getFeeMexc } = require('./GetFee/getFeeMexc')
let { getFeeBybit } = require('./GetFee/getFeeBybit')
const { getFeeGateIo } = require('./GetFee/getFeeGateIo')
const { getFeeLBank } = require('./GetFee/getFeeLBank')

const fetchAllFees = async() => {
    console.log('запрос на Fee...')
    await Promise.all([
        getFeeBinance(),
        getFeeMexc(),
        getFeeBybit(),
        getFeeGateIo(),
        getFeeLBank()
    ])
}

module.exports = { fetchAllFees };