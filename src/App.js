let { urlsArr } = require('./Data')
const { addInfo } = require('./PrepareData/addInfo')
const { fetchExtraInfo } = require('./ExtraInfo/fetchExtraInfo')
const { collectAllCoins } = require('./PrepareData/AfterPrepareData/collectAllCoins')
const { fetchAllMargins } = require('./Margin/fetchAllMargins')
const { fetchAllFees } = require('./Fee/fetchAllFees')
const { mergeAllFeesAndExchangeInfo } = require('./Utils/mergeAllFeesAndExchangeInfo')

// let time = 0

const Stream = () => {
    let requests = urlsArr.map((url) => fetch(url).then((response) => response.json()))
    Promise.allSettled(requests)
        .then(results => { 
            const start= new Date().getTime();
            results.forEach((result, num) => {
                if (result.status == "fulfilled") {
                    addInfo(result.value, num)
                }
                if (result.status == "rejected") {
                    console.log(result.reason)
                }
            })

            collectAllCoins()
            // const end = new Date().getTime();
            // time = end - start
            // console.log(time)
        })
}

const starter = async() => {
    await fetchExtraInfo()
    await fetchAllMargins()
    await fetchAllFees()
    mergeAllFeesAndExchangeInfo()

    // setInterval(() => Stream(), 2000);
    // setInterval(() => fetchAllFees(), 120000);
}

starter()