"use strict"

// Globals
const alapURL = "http://neu.tanulosarok.eu:8888/api/v1"
const TablaTartalom = document.querySelector(".container")
const Dialogus = document.getElementById("dialog")
const DialogusH1 = document.getElementById("dialogH1")
const Urlap = document.getElementById("form")
const Ment = document.getElementById("save")
const Modosit = document.getElementById("modify")
const Torol = document.getElementById("delete")
const Megse = document.getElementById("cancel")
const Uj = document.getElementById("new")

// Rekordok megjelenítése
function genHead() {
    const thead = document.createElement("thead")
    const tr = document.createElement("tr")

    const titles = ["Id", "Vezeték név", "Kereszt név", "Osztály", "Karbantartás"]
    for (const title of titles) {
        const th = document.createElement("th")
        th.textContent = title
        tr.append(th)
    }

    thead.append(tr)

    return thead
}

function createButton(text, color, id, rowId, event) {
    const button = document.createElement("button")
    button.dataset.id = rowId
    button.type = "button"
    button.classList.add("btn", color, "m-1")
    button.textContent = text
    button.id = id
    button.addEventListener("click", event)

    return button
}

function genRow(tanulo) {
    const tr = document.createElement("tr")
    tr.dataset.id = tanulo.id

    const oszlopok = [
        tanulo.id,
        tanulo.vnev,
        tanulo.knev,
        tanulo.osztaly
    ]

    for (const oszlop of oszlopok) {
        const td = document.createElement("td")
        td.innerText = oszlop
        tr.append(td)
    }

    const divButtons = document.createElement("div")
    divButtons.append(createButton("Szerkesztés", "btn-success", "edit", tanulo.id, editEvt))
    divButtons.append(createButton("Törlés", "btn-danger", "delete", tanulo.id, deleteEvt))
    tr.append(divButtons)

    return tr
}

function genDetails(tanulok) {
    const tbody = document.createElement("tbody")
    
    for (const tanulo of tanulok) {
        tbody.append(genRow(tanulo))
    }

    return tbody
}

function genTable(tanulok) {
    const Tabla = document.createElement("table")
    Tabla.classList.add("table", "table-striped")
    Tabla.append(genHead())
    Tabla.append(genDetails(tanulok))
    return Tabla
}

function showTable() {
    fetch(alapURL + "/tanulok/")
    .then((valasz) => {
        if (!valasz.ok) {
            throw new Error(`HTTP error! Status: ${valasz.status}`)
        }
        return valasz.json()
    })

    .then((tanulok) => {
        TablaTartalom.append(genTable(tanulok))
    })

    .catch((error) => {
        console.error(error)
    })
}

// Event functions
function sendNewRecord() {

    const formData = new FormData(Urlap)
    const tanulo = {
        "id": formData.get("id"),
        "vnev": formData.get("vnev"),
        "knev": formData.get("knev"),
        "osztaly": formData.get("osztaly")
    }

    fetch(alapURL + "/tanulok/", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        "body": JSON.stringify(tanulo)
    })
    .then ((valasz) => {
        if (!valasz.ok) {
            throw new Error(`HTTP error! Status: ${valasz.status}`)
        }
        return valasz.json()
    })

    .then((tanulo) => {
        const tbody = document.querySelector("tbody")
        tbody.append(genRow(tanulo))
        Dialogus.close()
    })

    .catch((error) => {
        console.error(error)
    })

}

function modifyRecord() {
    const formData = new FormData(Urlap)
    const pk = Urlap.dataset.id

    const tanulo = {
        "id": formData.get("id"),
        "vnev": formData.get("vnev"),
        "knev": formData.get("knev"),
        "osztaly": formData.get("osztaly")
    }

    fetch(alapURL + "/tanulok/" + pk, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        "body": JSON.stringify(tanulo)
    })
    .then ((valasz) => {
        if (!valasz.ok) {
            throw new Error(`HTTP error! Status: ${valasz.status}`)
        }
        return valasz.json()
    })

    .then((tanulo) => {
        const Oszlopok = document.querySelectorAll(`tr[data-id="${pk}"] td`)
        Oszlopok[0].textContent = tanulo.id
        Oszlopok[1].textContent = tanulo.vnev
        Oszlopok[2].textContent = tanulo.knev
        Oszlopok[3].textContent = tanulo.osztaly
        Dialogus.close()
    })

    .catch((error) => {
        console.error(error)
    })
    
}

function deleteRecord() {

    const pk = Urlap.dataset.id

    fetch(alapURL + "/tanulok/" + pk, {
        "method": "DELETE",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    .then ((valasz) => {
        if (!valasz.ok) {
            throw new Error(`HTTP error! Status: ${valasz.status}`)
        }
        document.querySelector(`tr[data-id="${pk}"]`).remove()
        Dialogus.close()
    })

    .catch((error) => {
        console.error(error)
    })
    
}

function getByID(id, func) {
    fetch(alapURL + "/tanulok/" + id)
    .then((valasz) => {
        if (!valasz.ok) {
            throw new Error(`HTTP error! Status: ${valasz.status}`)    
        }
        return valasz.json()
    })

    .then((tanulo) => {

        Urlap.dataset.func = func
        Urlap.dataset.id = tanulo.id
        Urlap.vnev.value = tanulo.vnev
        Urlap.knev.value = tanulo.knev
        Urlap.osztaly.value = tanulo.osztaly
    
        if (func == "PUT") {
            DialogusH1.textContent = "Rekord módosítása"
            Modosit.style.display = ""
            Torol.style.display = "none"
            Ment.style.display = "none"
        }
        else if (func == "DELETE") {
            DialogusH1.textContent = "Biztos, hogy törli a rekordot?"
            Modosit.style.display = "none"
            Torol.style.display = ""
            Ment.style.display = "none"
        }
        Dialogus.showModal()
    
    })

    .catch((error) => {
        console.error(error)
    })
}

// Events
function editEvt(evt) {

    evt.preventDefault()
    getByID(evt.target.dataset.id, "PUT")

}

function deleteEvt(evt) {
    evt.preventDefault()
    getByID(evt.target.dataset.id, "DELETE")
}

Urlap.addEventListener("submit", (evt) => {
    evt.preventDefault()
    if (Urlap.dataset.func == "POST") {
        sendNewRecord()
    }
    else if (Urlap.dataset.func == "PUT") {
        modifyRecord()
    }
    else if (Urlap.dataset.func == "DELETE") {
        deleteRecord()
    }
})

Uj.addEventListener("click", () => {
    DialogusH1.textContent = "Új rekord felvétele"
    Modosit.style.display = "none"
    Torol.style.display = "none"
    Ment.style.display = ""
    Urlap.dataset.func = "POST"
    Urlap.reset() 
    Dialogus.showModal()
})

Megse.addEventListener("click", () => {
    Dialogus.close()
})

// Main
showTable()
