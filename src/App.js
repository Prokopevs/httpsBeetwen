let { urlsArr, requestFlag } = require('./Data')
const { addInfo } = require('./PrepareData/addInfo')
const { fetchExtraInfo } = require('./ExtraInfo/fetchExtraInfo')
const { collectAllCoins } = require('./PrepareData/AfterPrepareData/collectAllCoins')
const { fetchAllMargins } = require('./Margin/fetchAllMargins')
const { fetchAllFees } = require('./Fee/fetchAllFees')
const { logReadyChain } = require('./TgBot/logReadyChain')
const { mergeAllFeesAndExchangeInfo } = require('./Utils/mergeAllFeesAndExchangeInfo')
const { getBestBidsAsksCoinbase } = require('./ExtraInfo/GetExchangeInfo/getExchangeInfoCoinbase')
const { getPoolsUniswap } = require('./Dex/Uniswap/getPoolsUniswap')

// let time = 0

const Stream = async () => {
    requestFlag.data = false
    const requests = createRequest()
    await Promise.allSettled(requests)
        .then(async (results) => { 
            const start= new Date().getTime()
            for(let i=0; i<results.length; i++) {
                if (results[i].status == "fulfilled") {
                    await addInfo(results[i].value, i)
                }
                if (results[i].status == "rejected") {
                    console.log(results[i].reason)
                }
            }
        })
       

    collectAllCoins()
    // const end = new Date().getTime();
    // time = end - start
    // console.log(time)
}

const starter = async() => {
    await fetchExtraInfo()
    await fetchAllMargins()
    await fetchAllFees()
    mergeAllFeesAndExchangeInfo()
    
    setInterval(async () => {
        if(requestFlag.data === true) {
            await Stream()
        }
    }, 10000)

    setInterval(() => fetchAllFees(), 120000);
    setInterval(() => logReadyChain(), 1100);
}

starter()



function createRequest() {
    let arrRequest = urlsArr.map((url) => fetch(url).then((response) => response.json()))
    // arrRequest.splice(12, 0, getPoolsUniswap())
    // arrRequest.splice(4,0,getBestBidsAsksCoinbase())
    return arrRequest
}