window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log(sidenVises)

    // læs produktliste
    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);

    //visProdukt();
}
//http://petlatkea.dk/2017/dui/api/product?callback=?&id=21

function visProduktListe(listen) {
    console.table(listen);
    listen.forEach(visProdukt);
}


function visProdukt(produkt) {
    console.log(produkt);
    // klon template
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);
    //indsæt data ind i klonen
    klon.querySelector(".data_navn").innerHTML = produkt.navn;
    klon.querySelector(".data_pris").innerHTML = produkt.pris;


    var rabatpris = produkt.pris - (produkt.pris * produkt.rabatsats / 100);
    klon.querySelector(".data_rabatpris").innerHTML = rabatpris;


    klon.querySelector(".data_billede").src = "/imgs/small/" + produkt.billede + "-sm.jpg";

    //button tilpasses til id
    klon.querySelector("button").dataset.id = produkt.id;
    //når "button" bliver klikket (eventListner)!
    klon.querySelector("button").addEventListener('click', knapKlikketPå);

    function knapKlikketPå(oplysningerOmEvent) {
        document.querySelector('#myModalLabel').textContent = "loade...";
        document.querySelector('#myModal .modal-body p').textContent = "...";

        var produktId = oplysningerOmEvent.target.dataset.id;


        //1 send forespørgsel til http://petlatkea.dk/2017/dui/api/product?callback=?&id=21
        // med det rigtige id
        $.getJSON("http://petlatkea.dk/2017/dui/api/product?callback=?&id=" + produktId, visModalIndhold)
    }

    function visModalIndhold(mereInfo) {
        console.log("mereInfo")

        document.querySelector('#myModalLabel').textContent = mereInfo.navn;
        document.querySelector('#myModal .modal-body p').textContent = mereInfo.langbeskrivelse;
    }




    if (produkt.udsolgt == false) {
        //produktet er ikke udsolgt
        // udsolgt text skal fjernes
        var text_udsolgt = klon.querySelector(".text_udsolgt");
        text_udsolgt.parentNode.removeChild(text_udsolgt);

    } else {
        klon.querySelector(".pris").classList.add("udsolgt");
    }

    if (produkt.udsolgt == true || produkt.rabatsats == 0) {
        //der er ikke rabat = rabat_text skal fjernes
        var rabatpris = klon.querySelector(".rabatpris");
        rabatpris.parentNode.removeChild(rabatpris);
    } else {
        klon.querySelector(".pris").classList.add("udsolgt");
    }

    //append klon til .produkt_liste
    //document.querySelector(".produktliste").appendChild(klon);
    console.log("." + produkt.kategori)

    document.querySelector("." + produkt.kategori).appendChild(klon);
}
/*
    if (produkt.kategori == 'forretter') {
        document.querySelector(".forretter").appendChild(klon);
    } else if (produkt.kategori == 'hovedretter') {
        document.querySelector(".hovedretter").appendChild(klon);
    } else if (produkt.kategori == 'sideorders') {
        document.querySelector('.sideorders').appendChild(klon);
    } else if (produkt.kategori == 'desserter') {
        document.querySelector('.desserter').appendChild(klon);
    } else if (produkt.kategori == 'drikkevarer') {
        document.querySelector('.drikkevarer').appendChild(klon);
    }
}
*/
