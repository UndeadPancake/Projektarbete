var http = require('http');
var fs = require('fs');
var url = require('url');


function loadReview(res) {
    var text = fs.readFileSync('save.txt');
    var arr = text.toString().split('|');

    res.write("<!DOCTYPE html>\n");
    res.write("<html>\n");
    res.write("<head>\n");
    res.write(" <style>\n");
    res.write("     td {\n");
    res.write("         border: 1px solid black;\n");
    res.write("     }\n");
    res.write(" </style>\n");
    res.write("</head>\n");
    res.write("<body>\n");
    res.write(" <h1>Movierate</h1>\n");
    res.write(" <h2>Rate the movies you've seen</h2>\n");
    res.write(" <table>\n");
    res.write("     <tr>\n");
    res.write("         <td rowspan='3' id='img'><img src='" + arr[0] + "' /></td>\n");
    res.write("         <td colspan='2' id='title'>" + arr[1] + "</td>\n");
    res.write("     </tr>\n");
    res.write("     <tr>\n");
    res.write("         <td id='rating'>" + arr[2] + "</td>\n");
    res.write("     </tr>\n");
    res.write("     <tr>\n");
    res.write("         <td colspan='2' id='review'>" + arr[3] + "</td>\n");
    res.write("     </tr>\n");
    res.write(" </table>\n");
    res.write("</body>\n");
    res.write("</html>\n");
};

function loadOverwrite(res) {
    res.write("<!DOCTYPE html>\n");
    res.write("<html>\n");
    res.write("<body>\n");
    res.write("<form>\n");
    res.write(" <label for='img'>Movie poster</label><br>\n");
    res.write("</form>\n");
    res.write("</body>\n");
    res.write("</html>\n");
};


http.createServer(function (req, res) {
    console.log(req.url);
    var q = url.parse(req.url, true);
    var imageFile = "." + q.pathname;
    if (req.url == "/") {
        loadReview(res);
        res.end();
    }
    else if (req.url == "/overwrite") {
        loadOverwrite(res);
        res.end();
    }
    else {
        fs.readFile(imageFile, function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }
}).listen(8080);