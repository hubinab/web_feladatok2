"use strict"

const url = "https://rickandmortyapi.com/api/character/"

function showDialog(evt) {
    const dialog = document.getElementById("darab")
    const div = document.querySelector("#darab > div")
    div.textContent = evt.target.dataset.epizodokszama + " epizódban szerepelt"
    dialog.showModal()
}

function karakter(character) {
    const col = document.createElement("div")
    col.classList.add("col-12", "col-md-3", "my-3")
    const div = document.createElement("div")

    const h2 = document.createElement("h2")
    h2.textContent = character.name
    div.append(h2)

    const img = document.createElement("img")
    img.classList.add("img-fluid")
    img.setAttribute("src", character.image)
    img.setAttribute("data-epizodokszama", character.episode.length)
    img.addEventListener("click", showDialog)
    div.append(img)

    const ul = document.createElement("ul")

    const liFaj = document.createElement("li")
    liFaj.textContent = "Faj " + character.species
    ul.append(liFaj)

    const liNem = document.createElement("li")
    liNem.textContent = "Nem " + character.gender
    ul.append(liNem)

    div.append(ul)

    col.append(div)
    return col
}

function karakterek(characters) {
    const row = document.createElement("div")
    row.classList.add("row")
    for (const character of characters) {
        row.append(karakter(character))
    }
    return row
}

function betolt(evt) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw Error("Hálózati hiba!")
            }
            return response.json()
        })
        .then((characters) => {
            document.getElementById("karakterek").append(karakterek(characters.results))
        })
        .catch(err => {
            console.error(err)
            alert("A karakterek betöltése sikertelen")
        })
}

window.addEventListener("load", betolt)

const dialogButton = document.querySelector("#darab > button")
dialogButton.addEventListener("click", () => {
    const dialog = document.getElementById("darab")
    dialog.close()
})    
