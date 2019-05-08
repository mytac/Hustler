const { writeFile, readFile, updateJSONFile } = require('./fs');
const { createError } = require('./createError');
const { getNowDate } = require('./moments');
const { alarm } = require('./alarm');

module.exports = {
	writeFile, readFile, createError, getNowDate, updateJSONFile, alarm
};