function getNowDate() {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth();
	const strDate = date.getDate();
	return `${year}-${month + 1}-${strDate}`;
}

module.exports = {
	getNowDate
};