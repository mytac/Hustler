const fs = require('fs');

function readFile(filename, decodeType = 'utf-8') {
	return new Promise((resolve, reject) => {
		fs.readFile(`${filename}`, decodeType, function (err, data) {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
}

function writeFile(filename, data ) {
	return new Promise((resolve, reject) => {
		fs.writeFile(`${filename}`, data, function (err) {
			if (err) {
				reject(err);
			} else {
				resolve('file save success');
			}
		});
	});
}

async function updateJSONFile({newContent={},filename='',path = __dirname, decodeType = 'utf-8'}){
	try{
		const prevContent=JSON.parse(await readFile(filename,path , decodeType));
		Object.keys(newContent).forEach((k)=>{
			prevContent[k]=newContent[k];
		});
		await writeFile(filename,JSON.stringify(prevContent),path);
	}catch(e){
		console.error(e);
	}
}

module.exports = {
	readFile,
	writeFile,
	updateJSONFile
};