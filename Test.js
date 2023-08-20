// ./src/App.js
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
require('events').EventEmitter.defaultMaxListeners = 20

const urlsNetwork = {
    'ERC20': 'https://app.uniswap.org/#/swap?chain=mainnet',
    'POLYGON/MATIC': 'https://app.uniswap.org/#/swap?chain=polygon',
    'ARBITRUM ONE': 'https://app.uniswap.org/#/swap?chain=arbitrum',
    'OPTIMISM': 'https://app.uniswap.org/#/swap?chain=optimism',
    'BSC/BEP20': 'https://app.uniswap.org/#/swap?chain=bnb',
    'AVAXC': 'https://app.uniswap.org/#/swap?chain=avalanche'
}

const uniswapPup = async (obj) => {
    let resultObj = {}
    const network = obj.buyFrom === 'uniswap' ? obj.buyNetwork : obj.sellNetwork
    const stableCoin = obj.buyFrom === 'uniswap' ? obj.buyOriginalQuoteAsset : obj.sellOriginalQuoteAsset
    const fullName = obj.buyFrom === 'uniswap' ? obj.names[0] : obj.names[1]
    const side = obj.buyFrom === 'uniswap' ? 'buy' : 'sell'
    
    let browser
    let page
    try {
        await puppeteer.use(StealthPlugin())
        await puppeteer.launch({ 
            headless: 1,
            executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', 
            userDataDir: 'C:/Users/proko/AppData/Local/Google/Chrome/User Data/Default'
        })
        browser = await puppeteer.launch({headless: 1})
        page = await browser.newPage()
        //--------------------Первая часть--------------------------// 
        try{
            let title = false
            let attempts = 0
            const tryGoto = async (i) => {
                try{
                    await page.goto(`${urlsNetwork[network]}`, {waitUntil: 'domcontentloaded'})
                    title = await page.evaluate(() => document.title)
                } catch (error) {
                    title = false
                    if(i === 2) {
                        throw error
                    }
                }
            }
            
            while(title === false && attempts < 3) {
                await tryGoto(attempts)
                attempts += 1 
                if (title === false) {
                    await new Promise((resolve) => setTimeout(resolve, 1000))
                }
            }

            await page.waitForTimeout(1000)
            const buttonsHTML = await page.$$('.token-symbol-container', e => e)// нахожу массив с 2 кнопками
            let button1
            let button2
            let count = 0
            for(let buttonHandle of buttonsHTML) {
                if(count === 0) {
                    button1 = buttonHandle
                } else {
                    button2 = buttonHandle
                }
                count++
            }

            const clickStable = async (button) => {
                await button.click() // кликаем по выбору монеты которую хотим отдать
                await page.waitForTimeout(400)
                await page.click(`[data-testid="common-base-${stableCoin}"]`) // выбераем нужный стейбл
                await page.waitForTimeout(400)
            }
            if(side === 'buy') { 
                await clickStable(button1)
            } else {
                await clickStable(button2)
            }

            const clickOnBaseCoin = async (button) => {
                await button.click() // кликаем по выбору монеты которую хотим отдать
                await page.waitForTimeout(600)
                await page.type('input[id="token-search-input"]', `${fullName}`, {delay: 20}) // пишем имя монеты
                await page.waitForTimeout(1000)
            }
            if(side === 'buy') { 
                await clickOnBaseCoin(button2)
            } else {
                await clickOnBaseCoin(button1)
            }
        } catch (error){
            console.log('ошибка первая часть' + ' | ' + obj.fullNickName + ' | ' + stableCoin)
            throw error
        }
        
        const is_enabled = (await page.$("div.css-kdspie")) == null // если монета нашлась вернётся true
        if(is_enabled) {
            //---------------------Вторая часть-------------------------// 
            try{
                // const fullName = await page.$eval('div[data-testid="currency-list-wrapper"] div[tabindex="0"] .css-vurnku', e => e.innerText)
                // const name = await page.$eval('div[data-testid="currency-list-wrapper"] div[tabindex="0"] .css-yfjwjl', e => e.innerText)
                // const arrOfName = [fullName, name]

                await page.click('div[data-testid="currency-list-wrapper"] div[tabindex="0"]') // кликаю по монете которую нашли
                await page.waitForTimeout(500)

                const is_safety_wrapper = (await page.$('[data-testid="TokenSafetyWrapper"]')) !== null // если появился safety_wrapper
                if(is_safety_wrapper) {
                    await page.click('[data-testid="TokenSafetyWrapper"] div button') // кликаю по 'я понимаю'
                    await page.waitForTimeout(500)
                }

                const inputsHTMLForType = await page.$$('input.token-amount-input', e => e)// нахожу массив инпутов
                let input1
                let input2
                let count = 0
                for(let inputHandle of inputsHTMLForType) {
                    if(count === 0) {
                        input1 = inputHandle
                    } else {
                        input2 = inputHandle
                    }
                    count++
                }

                if(side === 'buy') { 
                    await input1.type('100', {delay: 20})    // вводим '100' в импут со стейблкоином
                } else {
                    await input2.type('100', {delay: 20})    // вводим '100' в импут со стейблкоином
                }
                await page.waitForTimeout(400)

                await page.waitForFunction(() => !document.querySelector('.fpyFdg')) // дожидаемся пока пропадёт крутилка
                await page.waitForTimeout(500)
            } catch (error) {
                console.log('ошибка вторая часть' + ' | ' + obj.fullNickName + ' | ' + stableCoin)
                throw error
            }

            //---------------------Третья часть-------------------------// 
            let outputValue = '0'
            let fee 
            try{
                const inputsHTMLForValue = await page.$$('input.token-amount-input', e => e)// нахожу массив инпутов чтоб достать value
                let sideInNum = side === 'buy' ? 1 : 0

                let count = 0
                for(let fieldHandle of inputsHTMLForValue) {
                    if(count === sideInNum) {
                        outputValue = String(await page.evaluate(x => x.value, fieldHandle)) // сколько получим в итоге
                    }
                    count++
                }
                if(outputValue !== '0') {
                    const feeInString = await page.$eval('div.sc-bczRLJ .sc-nrd8cx-0 .hJYFVB .cTSGxd div', e => e.innerText)
                    fee = feeInString.slice(1)

                    const price = String(100 / Number(outputValue))
                    resultObj.bids = [[price, outputValue]]
                    resultObj.asks = [[price, outputValue]]
                    if(side === 'buy') {
                        obj.transferInfo.data.firstTransferArr.fee = String(fee) 
                    } else {
                        obj.transferInfo.data.firstTransferArr.gas = String(fee)
                    }

                } else {
                    console.log('----------------Зеленый----------------')
                    console.log('получил 0 для связки ' + obj.fullNickName + ' | ' + stableCoin)
                    throw error
                }
                await browser.close()
                console.log('<------------ok----------->')
                return resultObj

            } catch (error) {
                console.log('ошибка третья часть' + ' | ' + obj.fullNickName + ' | ' + stableCoin)
                throw error
            }
        } else {
            console.log('----------------Зеленый----------------')
            console.log('после ввода монеты ничего не нашёл' + ' | ' + obj.fullNickName + ' | ' + fullName + ' | ' + stableCoin)
            throw error
        }
    } catch (error){
        console.log(obj.fullNickName + ' | ' + fullName + ' | ' + stableCoin)
        console.log(error)
        console.log(obj)
        resultObj.status = 'error'
        await browser?.close()
        return resultObj
    }   
}

const obj = {
    symbol: 'LINKUSDT',
    baseAsset: 'LINK',
    quoteAsset: 'USDT',
    buyFrom: 'lbank',
    sellTo: 'uniswap',
    nickName: 'LINKUSDT_lbank_uniswap',
    spred: 1.965,
    hedging: false,
    nameChecked: false,
    names: [ 'chainlink', 'ChainLink' ],
    time: '22:49:38',
    count: 2,
    sellOriginalSymbol: 'LINKUSDC',
    sellOriginalQuoteAsset: 'USDC',
    sellNetwork: 'ERC20',
    sellId: '0xd24b1542323096ccbf9cba3b13c5b9eb4a92c506',
    fullNickName: 'LINKUSDT_lbank_uniswap_0xd24b1542323096ccbf9cba3b13c5b9eb4a92c506',
    transferInfo: {
        data: { firstTransferArr: {fee: '0'}, allNetworks: [] },
        availableWithdraw: [ 'ERC20' ],
        availableDeposit: [ 'ERC20' ]
    }
}

const foo = async () => {
    await Promise.all([
        uniswapPup(obj),
        uniswapPup(obj),
        uniswapPup(obj),
        uniswapPup(obj),
        uniswapPup(obj),
        uniswapPup(obj),
        uniswapPup(obj),
        uniswapPup(obj),
        uniswapPup(obj),
        uniswapPup(obj),
    ]).then(res => res.forEach((e) => console.log(e)))
}

foo()




       