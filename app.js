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
    res.write("     body {\n");
    res.write("         background-color: #800000;\n");
    res.write("     }\n");
    res.write("     h1, h2 {\n");
    res.write("         background-color: #FAFAC0;\n");
    res.write("         width: 100%;\n");
    res.write("         margin: auto;\n");
    res.write("         text-align: center;\n");
    res.write("     }\n");
    res.write("     table, td {\n");
    res.write("         background-color: #FAFAC0;\n");
    res.write("         border-collapse: collapse;\n");
    res.write("         margin-left: 20%;\n");
    res.write("         width: 800px;\n");
    res.write("         padding: 10px;\n");
    res.write("     }\n");
    res.write("     #img, #tdimg {\n");
    res.write("         width: 250px;\n");
    res.write("         height: 300px;\n");
    res.write("     }\n");
    res.write("     #title, #rating {\n");
    res.write("         height: 20px;\n");
    res.write("     }\n");
    res.write("     #rating {\n");
    res.write("         font-style: italic;\n");
    res.write("     }\n");
    res.write(" </style>\n");
    res.write("</head>\n");
    res.write("<body>\n");
    res.write(" <h1>Movierate</h1>\n");
    res.write(" <h2>Rate the movies you've seen</h2>\n");
    res.write(" <table>\n");
    res.write("     <tr>\n");
    res.write("         <td rowspan='3' id='tdimg'><img src='" + arr[0] + "' id='img'/></td>\n");
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
    res.write("<head>\n");
    res.write(" <style>\n");
    res.write("     body {\n");
    res.write("         background-color: #800000;\n");
    res.write("     }\n");
    res.write("     label, #submit {\n");
    res.write("         margin-left: 20%;\n");
    res.write("     }\n");
    res.write("     label, #img {\n");
    res.write("         color: white;\n");
    res.write("     }\n");
    res.write(" </style>\n");
    res.write("</head>\n");
    res.write("<body>\n");
    res.write("<form>\n");
    res.write(" <label for='img'>Movie poster:</label>\n");
    res.write(" <input type='file' id='img' name='img'><br>\n");
    res.write(" <label for='title'>Title:</title>\n");
    res.write(" <input type='text' id='title' name='title'><br>\n");
    res.write(" <label for='rating'>Rating:</label>\n");
    res.write(" <input type='number' id='rating' name='rating' min='0' max='10'><br>\n");
    res.write(" <label for='review'>Review:</label>\n");
    res.write(" <textarea id='review' name='review' rows='10' cols='30'></textarea><br><br>\n");
    res.write(" <input type='submit' value='submit' id='submit'>\n");
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