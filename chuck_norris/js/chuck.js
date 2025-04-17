"use strict"

function viccLekerese(url) {
    fetch(url)

    .then(response => response.json())

    .then(joke => {
        viccMegjelenitese(joke.value)
    })

    .catch(err => {
        console.error("Vicc betöltése sikertelen")
        alert("Vicc betöltése sikertelen")
    })
}

function mutasdGombKattintas(evt) {
    evt.preventDefault()
    const kategoria = document.getElementById("kategoria")
    viccLekerese("https://api.chucknorris.io/jokes/random?category=" + kategoria.value)
}

function formGeneralasa(categories) {
    const form = document.createElement("form")
    form.style.backgroundColor = "lightgray"
    form.style.borderWidth = "1px"
    form.style.borderStyle = "solid"
    form.style.borderColor = "black"
    form.style.borderRadius = "0.25rem"
    form.style.padding = "1rem"
    form.style.marginTop = "1rem"

    const label = document.createElement("label")
    label.htmlFor = "kategoria"
    const labelText = document.createTextNode("Kategória:")
    label.appendChild(labelText)
    form.appendChild(label)

    const select = document.createElement("select")
    select.name = "kategoria"
    select.id = "kategoria"
    select.classList.add("form-select")
    select.classList.add("my-2")
    for (let category of categories) {
        const option = document.createElement("option")
        option.value = category
        const szokezdo = category.charAt(0).toUpperCase()
        + category.slice(1);
        const optionText = document.createTextNode(szokezdo)
        option.appendChild(optionText)
        select.append(option)
    }
    form.appendChild(select)
    const submit = document.createElement("input")
    submit.type = "submit"
    submit.value = "Véletlen vicc a kiválasztott kategóriából"
    submit.classList.add("btn", "btn-success", "my-2")
    submit.addEventListener("click", mutasdGombKattintas)
    form.appendChild(submit)
    const viccek = document.getElementById("viccek")
    viccek.parentNode.insertBefore(form, viccek)
    document.getElementById("urlap").style.display = "none"
}

function viccMegjelenitese(text) {
    const alertDiv = document.createElement('div')
    alertDiv.classList.add("alert", "alert-info", "alert-dismissible", "fade", "show", "my-3")
    alertDiv.setAttribute("role","alert")
    const textNode = document.createTextNode(text)
    alertDiv.append(textNode)
    const btn = document.createElement("button")
    btn.classList.add("btn-close")
    btn.setAttribute("type","button")
    btn.setAttribute("aria-label","Bezárás")
    btn.dataset.bsDismiss = "alert"
    alertDiv.append(btn)
    for (const node of document.getElementById("viccek").childNodes)
        {
        node.remove()
        }
    document.getElementById("viccek").append(alertDiv)
}

document.querySelector("#random").addEventListener("click", (evt) => {
    viccLekerese("https://api.chucknorris.io/jokes/random");
})

// viccMegjelenitese("Chuck Norris knows the last digit of PI.")

document.querySelector("#urlap").addEventListener("click", (evt) => {
    fetch("https://api.chucknorris.io/jokes/categories")
    .then(response => response.json())
    .then(categories => {
        formGeneralasa(categories)
    })    
})