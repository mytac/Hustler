/* 参考文档：
http://www.r9it.com/20171106/puppeteer.html
*/
const puppeteer = require('puppeteer');
const configs = require('./config');
const { createError } = require('./src/utils');

const { BASE_URL, POLL_TIME, STOCK_LIST } = configs;

(async () => {
	const browser = await (puppeteer.launch({
		//设置超时时间
		timeout: 15000,
		//如果是访问https页面 此属性会忽略https错误
		ignoreHTTPSErrors: true,
		// 打开开发者工具, 当此值为true时, headless总为false
		devtools: false,
		// 关闭headless模式, 不会打开浏览器
		headless: true
	}));

	for (const url of STOCK_LIST) {
		const page = await browser.newPage();
		page.code = url;
		await page.goto(BASE_URL + url + '.html');
	}



	function polling(page, i = 0) {
		return new Promise((resolve, reject) => {
			const el = page.$('#price9');
			if (el) { resolve(page); }
			reject(createError('未找到目标dom'));
		})
			.then(page => page.$eval('#price9', input => input.innerText))
			.then((price) => {
				console.log(`code ${page.code} - price  ${price}`);
				return new Promise((resolve) => {
					setTimeout(() => {
						resolve();
					}, POLL_TIME);
				});
			})
			.then(() => polling(page, i + 1))
			.catch(err => {
				if (err && err.msg) {
					console.error(err.msg);
				}
			});
	}


	const pages = await browser.pages();
	const pollingRequests = pages.map(page => page.code && polling(page));
	Promise.all(pollingRequests);
})();
