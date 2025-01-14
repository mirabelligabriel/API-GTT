let URL = "https://gpa.madbob.org/query.php?stop=";

function aggiungiPassaggio(linea, orari){
    let div = document.createElement("div");
    let cerchio = document.createElement("div");
    let orariDiv = document.createElement("div");

    cerchio.classList.add("cerchio");
    cerchio.innerHTML = linea;

    orariDiv.classList.add("orari");
    orari.forEach(orario => {
        let p = document.createElement("p");
        p.classList.add("orario");
        p.innerHTML = orario.hour + (orario.realtime ? " *" : "");
        orariDiv.appendChild(p);
    });

    div.appendChild(cerchio);
    div.appendChild(orariDiv);
    div.classList.add("col");
    return div;
}

function mostra(array){
    let lista = document.getElementById("lista");
    lista.innerHTML = '';

    let linee = {};
    array.forEach(element => {
        if (!linee[element.line]) {
            linee[element.line] = [];
        }
        linee[element.line].push({ hour: element.hour, realtime: element.realtime });
    });

    for (let linea in linee) {
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        rowDiv.appendChild(aggiungiPassaggio(linea, linee[linea]));
        lista.appendChild(rowDiv);

        let br = document.createElement("br");
        lista.appendChild(br);
    }

    let text = document.getElementById("num").value;
    if (isNaN(text)) {
        alert("Inserire un numero valido");
    } else if (array.length == 0) {
        alert("Fermata non trovata");
    }
}

function cercaFermata(){
    fetch(URL + document.getElementById("num").value)
    .then(response => response.json())
    .then(data => mostra(data))
    .catch(error => {
        console.error('Error:', error);
        alert('Errore nel recupero dei dati');
    });
}