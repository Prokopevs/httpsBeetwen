require('dotenv').config({path:__dirname+'/../../.env'})
const axios = require('axios') 
let { kucoinFee } = require('../feeData')
let { feeKuCoinStable } = require('./utils/feeKuCoin')

const getFeeKuCoin = async () => {
    // const res = await axios.get('https://api.kucoin.com/api/v1/currencies') 
    // const currencyArr = res.data.data 
    
    // let reqUrls = [] 
    // const fullArr = [] 
    // let count = 0 

    // const fooReq = async (reqUrls, fullArr) => { 
    //     let arrRequest = reqUrls.map((url) => fetch(url).then((response) => response.json())) 
    //         await Promise.all(arrRequest) 
    //             .then(results => {  
    //                 results.forEach((result, num) => { 
    //                 fullArr.push(result.data) 
    //                 }) 
    //             } 
    //         ) 
    //     } 

    // for(let i=0; i<currencyArr.length; i++) { 
    //     const UStr = `https://api.kucoin.com/api/v2/currencies/${currencyArr[i].currency}` 
    //     reqUrls.push(UStr) 
    
    //     if(reqUrls.length === 18) { 
    //     await fooReq(reqUrls, fullArr) 
    //     count++ 
    //     console.log(count + ' ' + fullArr.length) 
    //     reqUrls = [] 
    //     } 
        
    //     if (i === currencyArr.length - 1) { // если последняя итерация 
    //         if(reqUrls.length) { 
    //             await fooReq(reqUrls, fullArr) 
    //             count++ 
    //             console.log(count + ' ' + fullArr.length) 
    //             reqUrls = [] 
    //         } 
    //     } 
    // } 
    // for(let i=0; i<fullArr.length; i++) {
    //     fullArr[i].coin = fullArr[i].currency
    //     fullArr[i].name = fullArr[i].fullName
    // }

    // kucoinFee.feeData = fullArr
    // return fullArr
    kucoinFee.feeData = feeKuCoinStable
}
 
module.exports = { getFeeKuCoin };


 
 
