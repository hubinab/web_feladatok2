"use strict"

// *********************************************************
// GET data & show table
// *********************************************************
function displayTable() {

    fetch(baseUrl+"/teas")
    
        .then(response => {
            if (!response.ok) {
                throw Error("Hálózati hiba!")
            }
            return response.json()
        })
        .then((teas) => {
            document.getElementById("teas").append(generateTable(teas))
        })
        .catch(err => {
            console.error(err)
            alert("A teák betöltése sikertelen")
        })
}

// *********************************************************
// Generate table
// *********************************************************
function generateTable(teas) {

    const table = document.createElement("table")
    table.classList.add("table", "table-striped")
    const thead = document.createElement("thead")

    const tr = document.createElement("tr")
    const titles = ["Megnevezés", "Gyártó", "Fajta", "Kiszerelés", "Mennyiség", "Ár", "Admin"]
    for (const title of titles) {
        const th = document.createElement("th")
        th.append(document.createTextNode(title))
        tr.append(th)
    }

    thead.append(tr)
    table.append(thead)

    const tbody = document.createElement("tbody")
    for (const tea of teas) {
        tbody.append(generateRow(tea))
    }
    table.append(tbody)

    return table
}

// *********************************************************
// Add new row to table
// *********************************************************
function generateRow(tea) {

    const tr = document.createElement("tr")

    const contents = [
        tea.name,
        tea.brand.name,
        tea.range,
        tea.format,
        `${tea.qty} ${tea.unit}`,
        `${tea.price} Ft`
        ]

    for (const content of contents) {
        const td = document.createElement("td")
        td.innerText = content
        td.style.paddingTop = "1rem"
        tr.append(td)
    }

    const td = document.createElement("td")

    const divButtons = document.createElement("div")
    divButtons.classList.add("row", "mt-n1")
    
    const divButtonEdit = document.createElement("div")
    divButtonEdit.classList.add("col-12", "col-xxl-6", "mt-1")
    const buttonEdit = document.createElement("button")
    buttonEdit.type = "submit"
    buttonEdit.id = "edit"
    buttonEdit.classList.add("btn", "btn-warning")
    buttonEdit.textContent = "Szerkesztés"
    buttonEdit.value = tea.id
    buttonEdit.onclick="\" location.href=\'#form\' \""
    buttonEdit.addEventListener("click", evtEdit)
    divButtonEdit.append(buttonEdit)

    divButtons.append(divButtonEdit)

    const divButtonDel = document.createElement("div")
    divButtonDel.classList.add("col-12", "col-xxl-6", "mt-1")
    const buttonDel = document.createElement("button")
    buttonDel.type = "submit"
    buttonDel.id = "del"
    buttonDel.classList.add("btn", "btn-danger")
    buttonDel.textContent = "Törlés"
    buttonDel.value = tea.id
    buttonDel.addEventListener("click", evtDelete)
    divButtonDel.append(buttonDel)

    divButtons.append(divButtonDel)

    td.append(divButtons)

    tr.append(td)

    return tr            
}

// *********************************************************
// Form submit event (POST new record to API)
// *********************************************************
function sendNewTea(evt) {
    
    evt.preventDefault()

    const inputName = document.getElementById("name")
    const inputBrandId = document.getElementById("brand_id")
    const inputRange = document.getElementById("range")
    const inputFormat = document.getElementById("format")
    const inputQty = document.getElementById("qty")
    const inputUnit = document.getElementById("unit")
    const inputPrice = document.getElementById("price")

    const newTea = 
    {
        "name": inputName.value,
        "range": inputRange.value,
        "format": inputFormat.value,
        "qty": inputQty.value,
        "unit": inputUnit.value,
        "price": inputPrice.value,
        "brand_id": inputBrandId.value
    }

    fetch(baseUrl+"/teas/", {
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        "body": JSON.stringify(newTea)
    })
        .then(response => {
            if (!response.ok) {
                if (422 == response.status) {
                    alert("Az elküldött adatok helytelenek")
                    throw Error("Az elküldött adatok helytelenek")
                }
                throw Error("Hiba!")
            }
           return response.json()
        })
        .then(tea => {
            const row = generateRow(tea)
            document.querySelector("#teas > table > tbody").append(row)
        })
        .catch(error => {
            console.error(error)
        })
}

// *********************************************************
// PUT record to API
// *********************************************************
function modTea(evt) {
    
    evt.preventDefault()

    const pk = document.getElementById("form").dataset.id

    const inputName = document.getElementById("name")
    const inputBrandId = document.getElementById("brand_id")
    const inputRange = document.getElementById("range")
    const inputFormat = document.getElementById("format")
    const inputQty = document.getElementById("qty")
    const inputUnit = document.getElementById("unit")
    const inputPrice = document.getElementById("price")

    const modTea = 
    {
        "name": inputName.value,
        "range": inputRange.value,
        "format": inputFormat.value,
        "qty": inputQty.value,
        "unit": inputUnit.value,
        "price": inputPrice.value,
        "brand_id": inputBrandId.value
    }

    fetch(baseUrl+"/teas/"+pk, {
        "method": "put",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        "body": JSON.stringify(modTea)
    })
        .then(response => {
            if (!response.ok) {
                if (422 == response.status) {
                    alert("Az elküldött adatok helytelenek")
                    throw Error("Az elküldött adatok helytelenek")
                }
                throw Error("Hiba!")
            }
           return response.json()
        })
        .then(tea => {
            // Ez a rész kicsit gagyi...
            // A tábla sorokat olvasom végig, amint megtalálom a törlés gombba a
            // módosított sort, ott az összes td-n módosítom a megjelenített értékeket 
            const tableRows = document.querySelectorAll("tbody tr")
            for (const row of tableRows) {
                //   tr               td              div              div               btn
                if (row.lastElementChild.lastElementChild.lastElementChild.firstElementChild.value == pk) {
                    const rowColls = row.querySelectorAll("td")
                    rowColls[0].innerText = tea.name
                    rowColls[1].innerText = tea.brand.name
                    rowColls[2].innerText = tea.range
                    rowColls[3].innerText = tea.format
                    rowColls[4].innerText = `${tea.qty} ${tea.unit}`
                    rowColls[5].innerText = `${tea.price} Ft`
                    const form = document.getElementById("form")
                    form.style.display = "none"                    
                    row.scrollIntoView()
                    break
                }
            }
        })
        .catch(error => {
            console.error(error)
        })
}

// *********************************************************
// Edit button click event 
// *********************************************************
function evtEdit(evt) {

    evt.preventDefault()

    fetch(baseUrl+"/teas/"+evt.target.value)
    
        .then(response => {
            if (!response.ok) {
                throw Error("Hálózati hiba!")
            }
            return response.json()
        })
        .then((tea) => {
            const modosit = document.getElementById("mod")
            modosit.style.display = ""
            const ment = document.getElementById("ment")
            ment.style.display = "none"
        
            const form = document.getElementById("form")
            form.style.display = ""
            form.name.value = tea.name
            form.brand_id.value = tea.brand
            form.range.value = tea.range
            form.format.value = tea.format
            form.qty.value = tea.qty
            form.unit.value = tea.unit
            form.price.value = tea.price
            form.dataset.id = tea.id
            form.scrollIntoView()
        })
        .catch(err => {
            console.error(err)
            alert("A tea betöltése sikertelen")
        })
}

// *********************************************************
// Delete button click event (send DELETE request to API)
// *********************************************************
function evtDelete(evt) {
    
    evt.preventDefault()

    fetch(baseUrl+"/teas/"+evt.target.value, {
        "method": "delete",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                if (404 == response.status) {
                    alert("Nincs ilyen rekord")
                    throw Error("Nincs ilyen rekord, törlés sikertelen")
                }
                throw Error("Hiba!")
            }
            return evt
        })
        .then(evt => {
            // Ez a rész is kicsit gagyi...
            // ....BTN        -> div        -> div         -> td         -> tr
            evt.target.parentElement.parentElement.parentElement.parentElement.remove()
        })
        .catch(error => {
            console.error(error)
        })
}

//*******************************************************
// Main
//*******************************************************

// SULI:
//const baseUrl = "http://172.19.0.12:8761/api"

// Otthon:
//const baseUrl = "http://127.0.0.1:8000/api"
//const baseUrl = "http://localhost:8000/api"
//const baseUrl = "http://192.168.1.168:8000/api"
const baseUrl = "http://84.21.26.136:8000/api"

displayTable()

// Ürlap submit esemény figyelése
const form = document.querySelector("form")
form.addEventListener("submit", sendNewTea)
form.style.display = "none"; 

// "Új termék felvitele" gomb nyomás figyelése
const buttonUj = document.getElementById("new")
buttonUj.addEventListener("click", () => {
    const form = document.querySelector("form")
    form.style.display = "";
    form.scrollIntoView()
    const modosit = document.getElementById("mod")
    modosit.style.display = "none"
    const ment = document.getElementById("ment")
    ment.style.display = ""
})

// Módosítás gomb nyomás figyelés
const buttonMod = document.getElementById("mod")
buttonMod.addEventListener("click", modTea)
