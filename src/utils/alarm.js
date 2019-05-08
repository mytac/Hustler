
const http = require('http');
const c = require('child_process');
function alarm(isUp) {

	const server = http.createServer((req, res) => {
		res.writeHead(200, {
			'content-type': 'text-html'
		});
		res.write('<head><meta charset="utf-8"/></head>');
		// res.write('<script>alert("hustler预警提示")</script>');
		if (isUp) { res.end('【高抛提示！！！】'); }
		else {
			res.end('【低吸提示！！！】');
		}
	});
	server.listen(8888);
	c.exec('start http://localhost:8888');
	setTimeout(() => { server.close(); }, 200);

}

module.exports = { alarm };