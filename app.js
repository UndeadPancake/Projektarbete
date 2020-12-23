var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function (req, res) {
    console.log(req.url);
    var q = url.parse(req.url, true);
    var imageFile = "." + q.pathname;
    if (req.url == "/") {
        fs.readFile('site.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }
    else if (req.url == "/script.js") {
        fs.readFile('script.js', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.write(data);
            res.end();
        });
    }
    else {
        fs.readFile(imageFile, function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }
}).listen(8080);