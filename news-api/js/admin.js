"use strict"

const baseURL = "http://localhost:8888/api/v1/napilapok"

const adatok = document.getElementById("adatok")
const uj = document.getElementById("new")
const urlap = document.querySelector("form")

function createRow(lap) {

    const tr = document.createElement("tr")
    const adatok = [
        lap.id,
        lap.cim,
        lap.alapitva,
        lap.kiado,
        `kb. ${lap.peldany} példány`,
        lap.tematika
    ]

    for (const cella of adatok) {
        const td = document.createElement("td")
        td.textContent = cella
        tr.append(td)
    }

    const td = document.createElement("td")
    const torles = document.createElement("btn")
    torles.classList.add("btn", "btn-danger")
    torles.textContent = "Törlés"
    torles.dataset.id = lap.id
    torles.addEventListener("click", deleteRow)
    td.append(torles)
    tr.append(td)


    return tr
}

function createTable(lapok) {

    const table = document.createElement("table")
    table.classList.add("table", "table-striped")
    const thead = document.createElement("thead")
    const tr = document.createElement("tr")
    const fej = [
        "ID",
        "Cím",
        "Alapítva",
        "Kiadó",
        "Példány",
        "Tematika",
        "Törlés"
    ]

    for (const cella of fej) {
        const th = document.createElement("th")
        th.textContent = cella
        tr.append(th)
    }
    thead.append(tr)
    table.append(thead)

    const tbody = document.createElement("tbody")
    for (const lap of lapok) {
        tbody.append(createRow(lap))
    }

    table.append(tbody)
    return table
}

function show() {
    fetch(baseURL)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        return response.json();
    })
    .then((lapok) => {
        adatok.append(createTable(lapok))
    })
}

show()

const ujBtn = document.getElementById("uj")
ujBtn.addEventListener("click", () => {
    uj.classList.add("d-block")
})

urlap.addEventListener("submit", (evt) => {
    evt.preventDefault()
    const formData = new FormData(urlap)
    const alapitva = formData.get("alapitva")
    if (alapitva > 2023) {
        alert("Legfeljebb 2023-as lehet az alapítás!")
        return
    }
    const kiado = formData.get("kiado")
    const re = /[Kft.,Bt.,Zrt.,Nyrt.]$/
    if (!re.test(kiado)) {
        alert("Csak Kft., Bt., Zrt. vagy Nyrt. lehet")
        return
    }

    const adatok = {
        "cim": formData.get("cim"),
        "alapitva": formData.get("alapitva"),
        "kiado": formData.get("kiado"),
        "peldany": formData.get("peldany"),
        "tematika": formData.get("tematika")
    }

    console.log(JSON.stringify(adatok))
    fetch(baseURL, {
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "accept": "application/json"
        },
        "body": JSON.stringify(adatok)
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        return response.json();
    })
    .then((lap) => {
        const tbody = document.querySelector("tbody")
        tbody.append(createRow(lap))
    })
    .catch((error) => {
        alert("A mentés sikertelen!")
    })
})

function deleteRow(evt) {
    fetch(`${baseURL}/${evt.target.dataset.id}`, {
        "method": "DELETE",
        "headers": {
            "content-type": "application/json",
            "accept": "application/json"
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        adatok.innerHTML = ""
        show()
    })
    .catch((error) => {
        alert("A törlés sikertelen!")
    })    
}