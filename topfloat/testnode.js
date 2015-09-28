var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
http.createServer(function (req, res) {
	console.log(req.body);
	fs.writeFile("app/datastorage/data.txt", 'kjkjk', function (err) {
		if (err) {
			console.log(err);
		}
	});	
	res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');