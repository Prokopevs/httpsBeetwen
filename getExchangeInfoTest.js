const axios = require("axios")
const { format } = require('date-fns')


// https://api.mexc.com/api/v3/exchangeInfo
const foo = async () => {
    try {
        const response = await axios.get('https://api.mexc.com/api/v3/exchangeInfo')
        let data = response.data.symbols.length
        const response1 = await axios.get('https://api.mexc.com/api/v3/ticker/bookTicker')
        let data1 = response1.data.length

        // let res =data.filter((elem) => elem.baseAsset === '1INCH')
        console.log(data)
        console.log(data1)

    } catch (error) {
        console.log(error)
    }
    
}
// foo()

// setInterval(() => foo(), 2000)

const dateTime = format(new Date(), 'HH:mm:ss')

console.log('13:04:32' > '13:04:12')
