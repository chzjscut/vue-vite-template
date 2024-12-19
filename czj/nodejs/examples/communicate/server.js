var http = require('http');

http.createServer(function(req, res){
	var url = req.url;
	console.log(url);
	if(url === '/test'){
		res.writeHead(200, {
			'Content-Type': 'text/plain',
			'Access-Control-Allow-Origin': '*',
			//'Access-Control-Allow-Headers': 'Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE'
		});
		let resJson = {
			data: 'nihao',
			status: 100
		}
		res.write('nihao');
		res.end();
	}
}).listen(8888);

 // 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');