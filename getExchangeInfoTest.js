const puppeteer = require('puppeteer');

const coinArray = ['BTC', 'ETH', 'LTC']; // Массив криптомонет

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto('https://www.bitmart.com/asset-withdrawal/en-US');
    await page.waitForSelector('input#coin');

    for (let coin of coinArray) {
      await page.type('input#coin', coin);
      await page.waitForSelector(`ul.antd-select-dropdown-menu > li[data-value="${coin}"]`, {
        visible: true,
      });
      await page.click(`ul.antd-select-dropdown-menu > li[data-value="${coin}"]`);

      await page.click('button[type="submit"]');

      await page.waitForSelector('div.network-list', {
        visible: true,
      });
      const networks = await page.$$eval('div.network-list div.network', (elems) =>
        elems.map((elem) => {
          const name = elem.querySelector('.network-opera span').innerText;
          const fee = elem.querySelector('.transfer-rate').innerText;
          return { name, fee };
        })
      );

      console.log(`Information for ${coin}:`);
      for (let network of networks) {
        console.log(`Network: ${network.name}`);
        console.log(`Fee: ${network.fee}`);
        console.log('---');
      }

      await page.goBack();
    }
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }
}

run();