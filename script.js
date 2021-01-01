var fs = require('fs');

function loadTable() {
    var text = "hej|san|jag|heter|maartin";
    var arr = text.split("|");
    document.getElementById("img").src = arr[0];
    document.getElementById("title").innerHTML = arr[1];
    document.getElementById("rating").innerHTML = arr[2];
    document.getElementById("place").innerHTML = arr[3];
    document.getElementById("review").innerHTML = arr[4];
}