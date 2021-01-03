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
    res.write(" <label for='img'>Movie poster:</label>\n");
    res.write(" <input type='file' id='img' name='img'><br>\n");
    res.write(" <label for='title'>Title:</title>\n");
    res.write(" <input type='text' id='title' name='title'><br>\n");
    res.write(" <label for='rating'>Rating:</label>\n");
    res.write(" <input type='number' id='rating' name='rating' min='1' max='10'><br>\n");
    res.write(" <label for='review'>Review:</label>\n");
    res.write(" <textarea id='review' name='review' rows='10' cols='30'></textarea><br><br>\n");
    res.write(" <input type='submit' value='submit'>\n");
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
            if (data) {
                res.write(data);
            }
            else {
                var qdata = q.query;
                fs.writeFileSync('save.txt', qdata.img + '|' + qdata.title + '|' + qdata.rating + '/10|' + qdata.review);
            }
            res.end();
            req.url = "/";
        });
    }
}).listen(8080);