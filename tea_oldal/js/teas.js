"use strict"

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
    buttonEdit.addEventListener("click", formEdit)
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
    buttonDel.addEventListener("click", formDel)
    divButtonDel.append(buttonDel)

    divButtons.append(divButtonDel)

    td.append(divButtons)

    tr.append(td)


    return tr            
}

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

function displayTable() {

    fetch(baseUrl+"/teas")
    
        .then(response => {
            if (!response.ok) {
                throw Error("Hálózati hiba!")
            }
            return response.json()
                // console.log(response)
        })
        .then((teas) => {
            document.getElementById("teas").append(generateTable(teas))
        })
        .catch(err => {
            console.error(err)
            alert("A teák betöltése sikertelen")
        })

}

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
            console.table("visszajött",tea)
            const row = generateRow(tea)
            document.querySelector("#teas > table > tbody").append(row)
        })
        .catch(error => {
            console.error(error)
        })

}

function formVisibility(evt) {
    const form = document.querySelector("form")
    if (form.style.visibility == "visible") {
        form.style.visibility = "hidden";    
    }
    else {
        form.style.visibility = "visible";    
    }
    
}

function formEdit(evt) {

    fetch(baseUrl+"/teas/"+evt.target.value)
    
        .then(response => {
            if (!response.ok) {
                throw Error("Hálózati hiba!")
            }
            console.log(response)
            return response.json()
        })
        .then((tea) => {
            const form = document.getElementById("form")
            form.style.visibility = "visible"
            form.name.value = tea.name
            form.brand_id.value = tea.brand_id
            form.range.value = tea.range
            form.format.value = tea.format
            form.qty.value = tea.qty
            form.unit.value = tea.unit
            form.price.value = tea.price
            form.scrollIntoView()
        })
        .catch(err => {
            console.error(err)
            alert("A tea betöltése sikertelen")
        })
    

}

function formDel(evt) {
    console.log("click")
}

//const baseUrl = "http://172.19.0.12:8761/api"
//const baseUrl = "http://127.0.0.1:8000/api"
//const baseUrl = "http://192.168.1.168:8000/api"
const baseUrl = "http://84.21.26.136:8000/api"

displayTable()

// const buttonMent = document.getElementById("ment")
// buttonMent.addEventListener("click", sendNewTea)
const form = document.querySelector("form")
form.addEventListener("submit", sendNewTea)
form.style.visibility = "hidden"; 

const buttonUj = document.getElementById("new")
buttonUj.addEventListener("click", formVisibility)
