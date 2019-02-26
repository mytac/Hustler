/* 参考文档：
http://www.r9it.com/20171106/puppeteer.html
*/
const puppeteer = require('puppeteer');
const configs = require('./config');
const { writeFile, readFile } = require('./src/utils');

const { BASE_URL, POLL_TIME, STOCK_LIST } = configs;

// 测试个股代码
const stockCode = '600776';

(async () => {
	const browser = await (puppeteer.launch({
		//设置超时时间
		timeout: 15000,
		//如果是访问https页面 此属性会忽略https错误
		ignoreHTTPSErrors: true,
		// 打开开发者工具, 当此值为true时, headless总为false
		devtools: true,
		// 关闭headless模式, 不会打开浏览器
		headless: false
	}));
	/* let pages = await browser.pages()
  for (const page of pages) */

	function wait() {
		return new Promise((resolve) => {
			setTimeout(resolve, POLL_TIME);
		});
	}

	for (const url of STOCK_LIST) {
		const page = await browser.newPage();
		await page.goto(BASE_URL + url + '.html');
	}

	const pages = await browser.pages();
	//	console.log('pages', pages);
	async function polling(page, i = 0) {
		try {
			const price = await page.$eval('#price9', input => input.innerText);
			if (!price) throw new Error('未找到目标dom');
			console.log('price', price);
			await wait();
			i++;
			if (i > 50) {
				// browser.close();
			} else {
				polling(page, i);
			}
		} catch (e) {
			console.error(e);
		}
	}

	pages.forEach(page => polling(page));

	//polling();


	//const bodyHandle = await page.$('body')

	//

})();
