var reader = new FileReader();

function loadTable() {
    var text = reader.readAsText("save.txt");
    var arr = text.split("|");
    document.getElementById("img").src = "asterix_12_stordad.jpg";
    document.getElementById("title").innerHTML = "Asterix: 12 stord�d";
    document.getElementById("rating").innerHTML = "6/10";
    document.getElementById("place").innerHTML = "#1";
    document.getElementById("review").innerHTML = "Asterix: 12 stord�d var en film jag tyckte om n�r jag var liten.";
}