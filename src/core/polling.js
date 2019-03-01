
const { createError } = require('../utils');
const { POLL_TIME } = require('../../config');

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

module.exports = {
	polling
};