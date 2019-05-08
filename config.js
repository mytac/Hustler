const BASE_URL = 'http://quote.eastmoney.com/';
const POLL_TIME = 5000; // 轮询时间间隔
const HEADLESS = false; // 是否开启无头模式
const STOCK_LIST = ['sh601111']; // 要加沪深标志


module.exports = {
	BASE_URL,
	POLL_TIME,
	HEADLESS,
	STOCK_LIST
};