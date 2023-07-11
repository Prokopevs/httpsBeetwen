let { urlsArr } = require('./Data')
const { addInfo } = require('./PrepareData/addInfo')
const { fetchExtraInfo } = require('./ExtraInfo/fetchExtraInfo')
const { collectAllCoins } = require('./PrepareData/AfterPrepareData/collectAllCoins')
const { fetchAllMargins } = require('./Margin/fetchAllMargins')

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

    setInterval(() => Stream(), 2000);
}

starter()