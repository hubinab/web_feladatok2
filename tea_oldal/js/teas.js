"use strict"

// *********************************************************
// "GLOBAL" variables
// *********************************************************

const Dialog = document.getElementById("formDialog")
const DialogH1 = document.getElementById("dialogH1")
const Modosit = document.getElementById("mod")
const Ment = document.getElementById("ment")
const Torol = document.getElementById("del")
const Form = document.getElementById("form")

// SULI:
//const baseUrl = "http://172.19.0.12:8761/api"

// Otthon:
//const baseUrl = "http://127.0.0.1:8000/api"
//const baseUrl = "http://localhost:8000/api"
//const baseUrl = "http://192.168.1.168:8000/api"
const baseUrl = "http://84.21.26.136:8000/api"


// *********************************************************
// GET all data & show table
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
    buttonEdit.type = "button"
    buttonEdit.id = "edit"
    buttonEdit.classList.add("btn", "btn-warning")
    buttonEdit.textContent = "Szerkesztés"
    buttonEdit.dataset.id = tea.id
    buttonEdit.addEventListener("click", evtEdit)
    divButtonEdit.append(buttonEdit)

    divButtons.append(divButtonEdit)

    const divButtonDel = document.createElement("div")
    divButtonDel.classList.add("col-12", "col-xxl-6", "mt-1")
    const buttonDel = document.createElement("button")
    buttonDel.type = "button"
    buttonDel.id = "del"
    buttonDel.classList.add("btn", "btn-danger")
    buttonDel.textContent = "Törlés"
    buttonDel.dataset.id = tea.id
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
function sendNewTea() {
    
    const product = new FormData(Form)

    const newTea = 
    {
        "name": product.get("name"),
        "range": product.get("range"),
        "format": product.get("format"),
        "qty": product.get("qty"),
        "unit": product.get("unit"),
        "price": product.get("price"),
        "brand_id": product.get("brand_id"),
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
            Dialog.close()
            row.scrollIntoView()
        })
        .catch(error => {
            console.error(error)
        })
}

// *********************************************************
// PUT record to API
// *********************************************************
function modTea(pk) {
    
    const product = new FormData(Form)

    const modTea = 
    {
        "name": product.get("name"),
        "range": product.get("range"),
        "format": product.get("format"),
        "qty": product.get("qty"),
        "unit": product.get("unit"),
        "price": product.get("price"),
        "brand_id": product.get("brand_id"),
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
            Dialog.close()
            const tableRows = document.querySelectorAll("tbody tr")
            for (const row of tableRows) {
                //   tr               td              div              div               btn
                if (row.lastElementChild.lastElementChild.lastElementChild.firstElementChild.dataset.id == pk) {
                    const rowColls = row.querySelectorAll("td")
                    rowColls[0].innerText = tea.name
                    rowColls[1].innerText = tea.brand.name
                    rowColls[2].innerText = tea.range
                    rowColls[3].innerText = tea.format
                    rowColls[4].innerText = `${tea.qty} ${tea.unit}`
                    rowColls[5].innerText = `${tea.price} Ft`
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
// GET by ID
// *********************************************************
function getByID(pk, func) {
    
    fetch(baseUrl+"/teas/"+pk)
    
        .then(response => {
            if (!response.ok) {
                throw Error("Hálózati hiba!")
            }
            return response.json()
        })
        .then((tea) => {
        
            form.name.value = tea.name
            form.brand_id.value = tea.brand
            form.range.value = tea.range
            form.format.value = tea.format
            form.qty.value = tea.qty
            form.unit.value = tea.unit
            form.price.value = tea.price
            form.dataset.id = tea.id
            form.dataset.func = func

            if (func == "DELETE") {
                DialogH1.textContent = "Biztos törli a teát?"
                Modosit.style.display = "none"
                Ment.style.display = "none"
                Torol.style.display = ""
            }
            else if (func == "PUT"){
                DialogH1.textContent = "Tea adatok módosítása"
                Modosit.style.display = ""
                Ment.style.display = "none"
                Torol.style.display = "none"
            }
            Dialog.showModal()
        })
        .catch(err => {
            console.error(err)
            alert("A tea betöltése sikertelen")
        })
}

// *********************************************************
// Send DELETE request to API
// *********************************************************
function delTea(pk) {
    
    fetch(baseUrl+"/teas/"+pk, {
        "method": "delete",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                if (422 == response.status) {
                    alert("Az elküldött adatok helytelenek")
                    throw Error("Az elküldött adatok helytelenek")
                }
                throw Error("Hiba!")
            }
            // Ez a rész kicsit gagyi...
            // A tábla sorokat olvasom végig, amint megtalálom a törlés gombba a
            // módosított sort, ott az összes td-n módosítom a megjelenített értékeket 
            Dialog.close()
            const tableRows = document.querySelectorAll("tbody tr")
            for (const row of tableRows) {
                //   tr               td              div              div               btn
                if (row.lastElementChild.lastElementChild.lastElementChild.firstElementChild.dataset.id == pk) {
                    row.remove()
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
    getByID(evt.target.dataset.id, "PUT")

}

// *********************************************************
// Delete button click event
// *********************************************************
function evtDelete(evt) {
    
    evt.preventDefault()
    getByID(evt.target.dataset.id, "DELETE")
}

//*******************************************************
// Global Events
//*******************************************************

// Form submit
const form = document.querySelector("form")
form.addEventListener("submit", (evt) => {
    evt.preventDefault()
    if (evt.target.dataset.func == "POST") {
        sendNewTea()
    }
    else if (evt.target.dataset.func == "PUT") {
        modTea(evt.target.dataset.id)
    }
    else if (evt.target.dataset.func == "DELETE") {
        delTea(evt.target.dataset.id)
    }
})

// New product click event
const buttonUj = document.getElementById("new")
buttonUj.addEventListener("click", () => {
    DialogH1.textContent = "Új tea felvitele"
    Modosit.style.display = "none"
    Torol.style.display = "none"
    Ment.style.display = ""
    form.dataset.func = "POST"
    Dialog.showModal()
})

// Cancel button click event
const buttonMegse = document.getElementById("cancel")
buttonMegse.addEventListener("click",(evt) => {
    evt.preventDefault()
    Dialog.close()
})

//*******************************************************
// Main
//*******************************************************

displayTable()

