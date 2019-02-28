function createError(msg = '') {
	const err = new Error();
	err.msg = msg;
}

module.exports = {
	createError
};