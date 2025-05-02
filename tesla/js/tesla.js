"use strict"

// const baseURL = "http://neu.tanulosarok.eu:7777/api/v1"
const baseURL = "http://localhost:8888/api/v1"

const cars = document.getElementById("cars")

function table(teslas) {
    const table = document.createElement("table")
    table.classList.add("table", "table-striped")
    const thead = document.createElement("thead")
    const tr = document.createElement("tr")
    const fej = [
        "Modell",
        "Gyorsítás",
        "WLTP",
        "Ülések",
        "Admin"
    ]
    for (const cella of fej) {
        const th = document.createElement("th")
        th.textContent = cella
        tr.append(th)
    }
    thead.append(tr)
    table.append(thead)

    const tbody = document.createElement("tbody")
    for (const tesla of teslas) {
        tbody.append(row(tesla))    
    }
    table.append(tbody)        
    return table
}

function row(tesla) {
    const tr = document.createElement("tr")
    const elemek = [
        tesla.model,
        `${tesla.acceleration} s`,
        `${tesla.wltp} km`,
        tesla.seats
    ]
    for (const elem of elemek) {
        const td = document.createElement("td")
        td.textContent = elem
        tr.append(td)
    }
    const td = document.createElement("td")
    const divBut = document.createElement("div")
    const button = document.createElement("button")
    button.classList.add("btn", "btn-danger")
    button.dataset.id = tesla.id
    button.type = "button"
    button.textContent = "Törlés"
    button.addEventListener("click", torles)
    divBut.append(button)
    td.append(divBut)
    tr.append(td)
    return tr
}

function load() {
    fetch(`${baseURL}/teslas`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json()
    })
    .then(teslas => {
        cars.innerHTML = ""
        cars.append(table(teslas))
    })
}

const uj = document.getElementById("newbutton")
const ujAuto = document.getElementById("newcar")
uj.addEventListener("click", (evt) => {
    ujAuto.classList.remove("d-none")
})

const form = document.querySelector("form")
form.addEventListener("submit", (evt) => {
    evt.preventDefault()

    const formTesla = new FormData(form)

    const reg1 = /^Model (S|3|X|Y) */
    if (!reg1.test(formTesla.get("model"))) {
        alert("Hibás modell!")
        return -1
    }

    const reg2 = /^(5|7)$/
    if (!reg2.test(formTesla.get("seats"))) {
        alert("Nem megfelelő az ülések száma!")
        return -1
    }

    const newTesla = {
        "model":formTesla.get("model"),
        "seats":formTesla.get("seats"),
        "acceleration":formTesla.get("acceleration"),
        "wltp":formTesla.get("wltp")
    }

    fetch(`${baseURL}/teslas`, {
        "method":"POST",
        "headers": {
            "content-type":"application/json",
            "accept":"application/json"
        },
        "body":JSON.stringify(newTesla)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json()
    })
    .then(tesla => {
        document.querySelector("tbody").append(row(tesla))
    })
    .catch(err => {
        alert("A mentés közben hiba történt!")
    })
})

function torles(evt) {
    fetch(`${baseURL}/teslas/${evt.target.dataset.id}`, {
        "method":"DELETE",
        "headers":{
            "content-type":"application/json"
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        //evt.target.parentElement.parentElement.parentElement.remove()
        load()
    })
    .catch(err => {
        alert("A törlés közben hiba történt.")
    })
}

load()