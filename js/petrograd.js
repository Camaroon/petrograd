window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log(sidenVises)

    // læs produktliste
    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);

    visProdukt();
}

function visProduktListe(listen) {
    console.table(listen);
    listen.forEach(visProdukt);
}


function visProdukt(produkt) {
    console.log(produkt);
    // klon template
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);
    //indsæt data ind i klonen

    //append klon til .produkt_liste
    document.querySelector(".produktliste").appendChild(klon);
}
