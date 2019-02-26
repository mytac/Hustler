const fs = require('fs');

function readFile(filename, path = __dirname, decodeType = 'utf-8') {
	return new Promise((resolve, reject) => {
		fs.readFile(`${path}${filename}`, decodeType, function (err, data) {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
}

function writeFile(filename, data, path = __dirname, ) {
	return new Promise((resolve, reject) => {
		fs.writeFile(`${path}${filename}`, data, function (err) {
			if (err) {
				reject(err);
			} else {
				resolve('file save success');
			}
		});
	});
}

module.exports = {
	readFile,
	writeFile
};