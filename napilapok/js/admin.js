"use strict"

// git clone https://github.com/rcsnjszg/ujsagos-json-server
// cd ujsagos-json-server
// make build
// make run

// Azzal kezdjetek, hogy a megadott URL-t megnyitjátok egy
// böngészőben, hogy lássátok, milyen adatokat ad vissza:
const baseURL = "http://localhost:8888/api/v1/napilapok"

// Ebbe a keretbe(div) kell a táblázatot majd beilleszteni:
const adatok = document.getElementById("adatok")
// Ez a keret(div) tartalmazza az űrlapot, a megjelenítésnél lesz rá szükség:
const uj = document.getElementById("new")
// Az űrlap(form) elemet is kivesszük, a benne megadott adatok miatt lesz rá szükségünk:
const urlap = document.querySelector("form")

// =====> Táblázat látrehozása, és megjelenítése
function generateRow(napilap) {
    const tr = document.createElement("tr")                 //<tr>
    // itt létrehozunk egy tömböt, hogy a cellákat (<td></td>)
    // ciklusban tudjuk beilleszteni a sorba (<tr></tr>)
    const adatok = [
        napilap.id,
        napilap.cim,
        napilap.alapitva,
        napilap.kiado,
        // Nem emlékszem, mivolt a Valami és a darab helyén :D
        `Valami ${napilap.peldany} darab`,
        napilap.tematika
    ]

    // A napilap adatait itt helyezzük be a cellákba(td), amiket
    // előtte létrehozunk, majd a cellát hozzáadjuk a sorhoz(tr):
    for (const adat of adatok) {
        const td = document.createElement("td")             //<td>
        // ez lesz a cella tartalma:
        td.textContent = adat
        tr.append(td)                                       //</td>
    }

    // Létrehozunk egy cellát(td) a törlés gombnak:
    const td = document.createElement("td")                 //<td>
    // létrehozzuk a törlésgombot:
    const torlesBtn = document.createElement("button")      //<button>
    // Ez a törlés gomb felirata:
    torlesBtn.textContent = "Törlés"                        //<button>Törlés
    // A törlés gombhoz hozzáadjuk a szükséges osztályokat:
    torlesBtn.classList.add("btn", "btn-danger")            //<button class="btn btn-danger">Törlés
    // Megadjuk a type attributumot is(erre lehet nincs szükség)
    torlesBtn.type = "button"                               //<button type="button" class="btn btn-danger">Törlés
    // A táblázat soraiban levő gomb egy adat(data-) attribútumába
    // eltároljuk az adott napilap rekord ID-ját. Így majd törléskor
    // ki tudjuk nyerni, melyik rekordot kell törölnie a szervernek:
    torlesBtn.dataset.id = napilap.id                       //<button type="button" class="btn btn-danger" data-id="n">Törlés 
                                                            // (n=az aktuális napilap ID-je)
    // Létrehozunk egy esemény figyelőt, ha valaki a 
    // táblázat soraiban levő törlés gombra kattint(click),
    // akkor fog lefutni a deleteRow függvény:
    torlesBtn.addEventListener("click", deleteRow)
    // A cellához(td) adjuk a Törlés gombot:
    td.append(torlesBtn)                                    //</button>
    // A sorhoz(tr) adjuk a cellát:
    tr.append(td)                                           //</td>

    // Visszaadjuk a létrehozott sort(tr)
    return tr                                               //</tr>
    /*
    HTML-ben ez így nézne ki (ezt adja vissz ez a függvény):
    <tr>
        <td>napilap.id értéke (pl.: "7")</td>
        <td>napilap.cim értéke (pl.: "Nemzeti Sport")</td>
        <td>napilap.alapitva értéke (pl.: "1903")</td>
        <td>napilap.kiado értéke (pl.: "Mediaworks Hungary Zrt.")</td>
        <td>Valami napilap.peldany értéke darab (Valami 27835 darab)</td>
        <td>napilap.tematika értéke (pl.: "sport")</td>
    </tr>
    */
}

function generateTable(napilapok) {
    // Létrehozzuk a tblázatot:
    const table = document.createElement("table")           //<table>
    // Beállítjuk a táblázat osztályait 
    // (eddig minden feladatnál megadta, hogy mit):
    table.classList.add("table", "table-striped")           //<table class="table table-striped">
    // Létrehozzuk a thead-et, ebbe lesz egy sorban(tr)
    // a fejléc cellái(th):
    const thead = document.createElement("thead")           //<thead>
    // Létrehozzuk a fejléc sorát(tr):
    const tr = document.createElement("tr")                 //<tr>

    // Egy tömbbe tesszük az oszlopok neveit, hogy aztán
    // egy ciklussal végig olvashassuk. A teas tutorialban
    // volt ez a megoldás:
    const oszlopok = [
        "ID",
        "Cím",
        "Alapítva",
        "Kiadó",
        "Példány",
        "Tematika",
        "Törlés"
    ]

    // Minden egyes oszlophoz létre hozunk egy fejléc cellát(th)
    // majd hozzáadjuk a cellát a sorunkhoz
    for (const oszlop of oszlopok) {
        const th = document.createElement("th")             //<th>
        // Ez lesz a cella tartalma:
        th.textContent = oszlop
        tr.append(th)                                       //</th>
    }
    // A thead-hoz adjuk a sort(tr):
    thead.append(tr)                                        //</tr>
    // A táblához adjuk a thead-et:
    table.append(thead)                                     //</thead>

    // Létrehozzuk a tbody-t:
    const tbody = document.createElement("tbody")           //<tbody>
    // itt annyi sort (<tr></tr>) hozunk létre, ahány elemet
    // visszakaptunk a fetch-től:
    for (const napilap of napilapok) {
        tbody.append(generateRow(napilap))
    }
    // A tbody-t hozzáadjuk a táblázatunkhoz(table)
    table.append(tbody)                                     //</tbody>

    // Visszaadjuk a táblázatot:
    return table                                            //</table>
    /*
    HTML-ben ez így nézne ki (ezt adja vissz ez a függvény):
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Cím</th>
                <th>Alapítva</th>
                <th>Kiadó</th>
                <th>Példány</th>
                <th>Tematika</th>
                <th>Törlés</th>
            <\tr>
        <\thead>
        <tbody>
            <tr>
                <td>1. napilap.id értéke</td>
                <td>1. napilap.cim értéke</td>
                <td>1. napilap.alapitva értéke</td>
                <td>1. napilap.kiado értéke</td>
                <td>Valami 1. napilap.peldany értéke darab</td>
                <td>1. napilap.tematika értéke</td>
            </tr>
            <tr>
                <td>2. napilap.id értéke</td>
                <td>2. napilap.cim értéke</td>
                <td>2. napilap.alapitva értéke</td>
                <td>2. napilap.kiado értéke</td>
                <td>Valami 2. napilap.peldany értéke darab</td>
                <td>2. napilap.tematika értéke</td>
            </tr>
            <tr>
                <td>3. napilap.id értéke</td>
                <td>3. napilap.cim értéke</td>
                <td>3. napilap.alapitva értéke</td>
                <td>3. napilap.kiado értéke</td>
                <td>Valami 3. napilap.peldany értéke darab</td>
                <td>3. napilap.tematika értéke</td>
            </tr>
            ...
            <tr>
                <td>n. napilap.id értéke</td>
                <td>n. napilap.cim értéke</td>
                <td>n. napilap.alapitva értéke</td>
                <td>n. napilap.kiado értéke</td>
                <td>Valami n. napilap.peldany értéke darab</td>
                <td>n. napilap.tematika értéke</td>
            </tr>
        <\tbody>
    </table>
    */
}

function show() {
    // A fetch-es részt be kell magolni
    fetch(baseURL)
    .then((response) => {
        // A response "paraméter"-ben tároljuk el a szervertől kapott választ.
        // Ez egy objektum, aminek van egy ok tulajdonsága, ha true, akkor minden rendben volt,
        // ha false, akkor baj van. A !response.ok-t felírhatnánk úgy is, hogy:
        // if (response.ok == false){ ... .
        if (!response.ok) {
            // Amit itt "dob", azt fogja a catch-nél "elkapni".
            // A catch err "paraméterében" az lesz, hogy "Hiba a betöltés közben!"
            throw "Hiba a betöltés közben!"
        }
        return response.json()
    })
    .then((napilapok) => {
        // <div id="adatok">(ez a táblázat helye)</div> ebbe a keretbe teszi a 
        // fent öszetákolt táblázatot.
        // A napilapok "paraméter"-ben a response.json() van.
        adatok.append(generateTable(napilapok))
    })
    .catch((err) => {
        // Az err-ben a throw által "dobott" hibaüzenet jelenik meg
        // itt a "Hiba a betöltés közben!"-t.
        alert(err)
    })
}

// Fontos, hogy a táblázat megjelenítéséhez meghívjuk
// az erre szolgáló metódust. 
// (én pl. ezt elfelejtettem, kb. 5-10 perc volt mire rájöttem :D)
show()
// <==== Táblázat látrehozása, és megjelenítése

// ********************************************************************

// ====> Új felvitel gomb lenyomása
// Kikeressük az új gobmot, úgy, hogy keressuk az "uj" id-t.
// Ezt keressük: <button type="button" class="btn btn-primary" id="uj">Új felvitel</button>
const ujBtn = document.getElementById("uj")
// Majd hozzáadunk egy eseményfigyelőt a gombhoz.
// Ha valaki lenyomja a gombot (click esemény), akkor lefut ez a rész:
// uj.classList.remove("d-none"), ami miatt megjelenik a form
ujBtn.addEventListener("click", () => {
    // A feladatban a d-block elemet kellett a listához ADDNI, de nem emlékszem rá,
    // hogy volt a HTML-ben előkészítve. Ezért a teslas megoldást használtam.
    uj.classList.remove("d-none")
})
// <==== Új felvitel gomb lenyomása

// ********************************************************************

// ====> Úrlap submit esemény/Ment gomb megnyomása + ellenőrzések
// Az űrlaphoz (form) felvesszünk egy eseményfigyelőt.
// Ha valaki elküldi (submit) a formot, akkor fog lefutni az alatta levő rész.
urlap.addEventListener("submit", (evt) => {
    // Ez azért kell, hogy ne fusson le a "szokásos" html get kérés
    evt.preventDefault()

    // A form adatait beteszük egy ilyen objektumba.
    // Ennél csak az a lényeg, hogy benne lesznek azok az
    // értékek, amiket a felhasználó az úrlap mezőibe beírt.
    const formData = new FormData(urlap)

    // ====> Ellenőrzések
    // Kiolvassuk és eltároljuk az űrlap alapitva nevű mezőjét.
    // amit ide beírt:
    // <input type="number" name="alapitva" id="alapitva" class="form-control">
    // azt a formData.get-el kiolvassuk. A formData.get-nek a name= attribútumban
    // megadott értéket kell átadni ""-ok között.
    const alapitva = formData.get("alapitva")
    if (alapitva > 2023) {
        alert("Alapítás dátuma túl nagy!")
        return
    }

    // Szerintem ezzel a regexp-el csak akkor foglalkozzatok, ha nagyon vágjátok
    // sok időt nem érdemes elcseszni rá.
    const kiado = formData.get("kiado")
    const re = /\s+(Zrt\.|Bt\.|Kft\.|Nyrt\.)$/ // Az MI adta a megoldást :D
    if (!re.test(kiado)) {
        alert("A kiadónál adja meg a cég típusát (Kft., Bt., Nyrt. vagy Zrt.)!")
        return
    }
    // <==== Ellenőrzések

    // ====> Az űrlap mezőiből létrehozunk egy "szótár" objektumot
    // A szótár kulcs - érték párokat tartalmaz ":"-al elválasztva.
    // Több ilyen pár megadása esetén ","-vel kell elválasztani azokat.
    const ujNapilap = {
        "cim": formData.get("cim"),
        "alapitva": formData.get("alapitva"),
        "kiado": formData.get("kiado"),
        "peldany": formData.get("peldany"),
        "tematika": formData.get("tematika")
    }
    // <==== Az űrlap mezőiből létrehozunk egy "szótár" objektumot

    // ====> POST kérés beküldése a szervernek
    // A fetch-t be kell magolni
    fetch(baseURL, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        // Azt a "szótár"-at adjuk itt meg, amit felette létrehoztunk
        // az űrlap adataiból
        body: JSON.stringify(ujNapilap)
    })
    .then((response) => {
        if (!response.ok) {
            // itt ugyan az érvényes, mint amit fentebb írtam
            throw "Hiba a felvitelkor!"
        }
        return response.json()
    })
    .then((napilap) => {
        // Megkeressük a fentebb már létrehozott tbody-t:
        const tbody = document.querySelector("tbody")
        // Majd hozzá csapjuk a beküldött sorunkat:
        tbody.append(generateRow(napilap))
    })
    .catch((err) => {
        // Ezt is leírtam fentebb
        alert(err)
    })
    // <==== POST kérés beküldése a szervernek
})
// <==== Úrlap submit esemény/Ment gomb megnyomása + ellenőrzések

// ====> Törlés gomb esemény metódusa
// Ha valaki a táblázat soraiban levő Törlés gombra rányom (click), akkor
// lefut ez a függvény.
function deleteRow(evt) {
    // Ez nem feltétlenül kell, mert a gomb típusa "button", így nem biztos, hogy
    // alapértelmezetten bármit csinálna.
    evt.preventDefault()
    // Az evt.target az az elem, ami az eseményt kiváltotta.
    // Jelen esetben ez a táblázat soraiban lévő Törlés gomb.
    // Az evt.target.dataset.id a gomb data-id attributumának az értéke.
    // Ezt még a generateRow() függvényben állítottuk be.
    fetch(`${baseURL}/${evt.target.dataset.id}`, {
        method: "DELETE"
    })
    .then((response) => {
        if (!response.ok) {
            // Erről fentebb volt szó a show() fügvényben
            throw "Hiba a törlés közben!"
        }
        // Ez törli az "adatok" keret(div) tartalmát, tehát vissza áll erre:
        // <div id="adatok"></div>, nem lesz benne a táblázat.
        adatok.innerHTML = ""
        // Ez újra beteszi a táblázatot, immár a törölt sor nélkül.
        show()
    })
    .catch((err) => {
        // Erről fentebb volt szó a show() fügvényben
        alert(err)
    })
}
// <==== Törlés gomb esemény metódusa