const puppeteer = require('puppeteer-extra')

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

puppeteer.launch({ 
    headless: true, 
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', 
    userDataDir: 'C:/Users/proko/AppData/Local/Google/Chrome/User Data/Default'})
    .then(async () => {
    const browser = await puppeteer.launch({
      headless: false,
    });
  
    const page = await browser.newPage()
    await page.goto('https://app.uniswap.org/swap?chain=mainnet#/swap?chain=mainnet', {waitUntil: 'domcontentloaded'})
    await page.waitForTimeout(400)

    await page.click(".token-symbol-container:nth-child(2)")
    await page.waitForTimeout(400)
    await page.click('[data-testid="common-base-USDC"]')
    await page.waitForTimeout(400)
    await page.click(".token-symbol-container:nth-child(1)")
    await page.waitForTimeout(400)

    await page.type('input[id="token-search-input"]', 'WBTC', {delay: 40})
    await page.waitForTimeout(400)

    const is_enabled = (await page.$("div.css-kdspie")) == null
    if(is_enabled) {
    const fullName = await page.$eval('div[data-testid="currency-list-wrapper"] div[tabindex="0"] .css-vurnku', e => e.innerText)
    const name = await page.$eval('div[data-testid="currency-list-wrapper"] div[tabindex="0"] .css-yfjwjl', e => e.innerText)
    const arrOfName = [fullName, name]

    await page.click('div[data-testid="currency-list-wrapper"] div[tabindex="0"]')
    await page.waitForTimeout(400)

    const input = await page.$('input.token-amount-input')
    await input.type('100', {delay: 40})
    await page.waitForTimeout(400)

    await page.waitForFunction(() => !document.querySelector('.fpyFdg'))
    await page.waitForTimeout(500)

    const inputsHTML = await page.$$('input.token-amount-input', e => e)
    let outputValue = 0
    let count = 0
    for(let fieldHandle of inputsHTML) {
    if(count === 1) {
    outputValue = Number(await page.evaluate(x => x.value, fieldHandle))
    }
    count++
    }
    const feeInString = await page.$eval('div.sc-bczRLJ .sc-nrd8cx-0 .hJYFVB .cTSGxd div', e => e.innerText)
    const fee = Number(feeInString.slice(1))

    console.log(outputValue, fee)
    await browser.close()
    } else {
        console.log('После ввода ничего не нашёл')
    }
  })








