window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log(sidenVises)
    visProdukt();
}

function visProdukt() {
    // klon template
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);
    //indsæt data ind i klonen

    //append klon til .produkt_liste
    document.querySelector(".produktliste").appendChild(klon);
}
