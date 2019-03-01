const { writeFile, readFile,updateJSONFile } = require('./fs');
const { createError } = require('./createError');
const { getNowDate } = require('./moments');

module.exports = {
	writeFile, readFile, createError,getNowDate,updateJSONFile
};