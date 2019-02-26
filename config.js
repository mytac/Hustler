const BASE_URL = 'http://quote.eastmoney.com/';
const POLL_TIME = 5000; // 轮询时间间隔

const STOCK_LIST = ['600776', '002305']; // 个股代码（仅支持沪深）

module.exports = {
	BASE_URL,
	POLL_TIME,
	STOCK_LIST
};