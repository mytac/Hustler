/* 参考文档：
http://www.r9it.com/20171106/puppeteer.html
*/
const puppeteer = require('puppeteer');
const configs = require('./config');
const { polling } = require('./src/core');

const { BASE_URL, STOCK_LIST } = configs;

(async () => {
	const browser = await (puppeteer.launch({
		//设置超时时间
		timeout: 15000,
		//如果是访问https页面 此属性会忽略https错误
		ignoreHTTPSErrors: true,
		// 打开开发者工具, 当此值为true时, headless总为false
		devtools: false,
		// 关闭headless模式, 不会打开浏览器
		headless: false
	}));

	for (const url of STOCK_LIST) {
		const page = await browser.newPage();
		page.code = url;
		await page.goto(BASE_URL + url + '.html');
	}

	const pages = await browser.pages();
	const pollingRequests = pages.filter(page => !!page.code).map(p=>polling(p));
	console.log('pollingRequests length',pollingRequests.length);
	Promise.all(pollingRequests);
})();
