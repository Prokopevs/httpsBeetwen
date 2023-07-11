const axios = require("axios")

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
foo()

// setInterval(() => foo(), 2000)
