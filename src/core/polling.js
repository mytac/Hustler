
const { createError, getNowDate, readFile, writeFile, alarm } = require('../utils');
const { POLL_TIME } = require('../../config');

let isAlarm = false;

function polling(page, i = 0) {
	return new Promise((resolve, reject) => {
		const el = page.$('#price9');
		if (el) { resolve(page); }
		reject(createError('未找到目标dom'));
	})
		.then(page => i === 0 ? getFinalPrice(page) : page)
		.then(page => page.$eval('#price9', input => input.innerText))
		.then((price) => {
			console.log(`code ${page.code} - price  ${price}`);
			/*-----temp code start---*/
			if (!isAlarm && price < 9.55) {
				alarm(true);
				isAlarm = true;
			}
			/*-----temp code end---*/

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

// 获取前日成交价，只在i=0时获取
async function getFinalPrice(page) {
	const filename = './cache.json';
	try {
		const finalPrice = await page.$eval('#gt8', input => input.innerText);
		console.log('final price', finalPrice);

		const now = getNowDate();
		const stockObj = { [page.code]: finalPrice };
		const prevData = JSON.parse(await readFile(filename));
		console.log('prevData', prevData);
		const currentDay = prevData[now] || {};
		prevData[now] = { ...currentDay, ...stockObj };

		await writeFile(filename, JSON.stringify(prevData));
		return page;
	} catch (e) {
		console.log(e);
	}
}

module.exports = {
	polling, getFinalPrice
};