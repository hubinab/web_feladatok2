"use strict"

const baseURL = "http://localhost:8888"

const priceFormatOptions = {
    style: "currency",
    currency: "HUF",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
};

function priceFormat(price) {
    return new Intl.NumberFormat("hu-HU", priceFormatOptions).format(price)
}

function createCard(bicycle) {
    const divCard = document.createElement("div")
    divCard.classList.add("card", "mt-3")
    const img = document.createElement("img")
    img.src = `./images/${bicycle.id}.jpg`
    img.classList.add("card-top-img")
    divCard.append(img)

    const divCardBody = document.createElement("div")
    divCardBody.classList.add("card-body")
    divCard.append(divCardBody)
    const h3 = document.createElement("h3")
    h3.textContent = bicycle.name
    divCardBody.append(h3)
    const p = document.createElement("p")
    p.append(priceFormat(bicycle.price))
    divCardBody.append(p)
    const cardButton = document.createElement("button")
    cardButton.classList.add("btn", "btn-outline-primary")
    cardButton.type = "button"
    cardButton.textContent = "Részletek"
    // Ez így, bár működik, de a feladatban nem ez van
    // át kéne adni az id-t közvetlen a loadBicycle függvénynek
    // de azt eseménykezelőnél nem tudom, hogy lehet. 
    //cardButton.dataset.id = bicycle.id
    //cardButton.addEventListener("click", loadBicycle)

    // Az MI végül megadta a megoldást (arrow function-el 
    // [gyakorlatilag hívunk egy függvényt, hogy meghívhassuk paraméterrel a függvényt]):
    cardButton.addEventListener("click", (evt) => {
        loadBicycle(bicycle.id)
    })
    
    divCardBody.append(cardButton)
    divCard.append(divCardBody)

    return divCard
}

function showBicycles() {

    fetch(`${baseURL}/bicycles`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((response) => {
        const bicycles = document.getElementById("bicycles")
        for (const bicycle of response) {
            const col = document.createElement("div")
            col.classList.add("col-12", "col-md-4")
            col.append(createCard(bicycle))
            bicycles.append(col)
        }
    })
    .catch(error => {
        console.log(error)
    });

}

// Ez itt nem a legjobb, mert a feladatban az van, hogy adjuk át az id-t
// paraméterbe, de az eseményfigyelőnek nem lehet paramétert átadni...
// A saját tudásom szerint megoldottam:
// function loadBicycle(evt) {
//     fetch(`${baseURL}/bicycles/${evt.target.dataset.id}`)

// A MI megadta a megoldást: arrow function az eseménykezelő
// így ott még helyben hívható ez a függvény az id-val.
// Logikus, de kicsit kifacsart logika, jobb lenne, ha egyszerűen
// lehetne paramétert átadni, mindenféle trükk nélkül...
function loadBicycle(id) {
    fetch(`${baseURL}/bicycles/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((bicycle) => {
        const dialog = document.getElementById("bicycleDialog")
        const h1 = document.querySelector("dialog h1")

        h1.textContent = bicycle.name
        const photo = document.getElementById("bicyclePhoto")
        // Ez is MI!!!
        // Az append, mint a nevében is benne van, mindig hozzáad,
        // tehát append előtt törölni kell a tartalmat
        photo.innerHTML = ""
        const img = document.createElement("img")
        img.src = `./images/${bicycle.id}.jpg`
        img.classList.add("img-fluid")
        photo.append(img)
        const details = document.getElementById("bicycleDetails")
        // Ez is MI!!!
        // Az append, mint a nevében is benne van, mindig hozzáad,
        // tehát append előtt törölni kell a tartalmat
        // az ul-t és li-t azért nem kell törölni, mert az benne van a
        // details-ben.
        details.innerHTML = ""
        const ul = document.createElement("ul")
        // A strong is MI és az innerHTML is, van mit tanulni...
        const elemek = [`<strong>Kerék méret:</strong> ${bicycle.wheel_size} col`,
                        `<strong>Váltó:</strong> ${bicycle.speed} sebességes`, 
                        `<strong>Nem:</strong> ${bicycle.sex}`, 
                        `<strong>Típus:</strong> ${bicycle.type}`, 
                        `<strong>Szín:</strong> ${bicycle.color}`, 
                        `<strong>Ár:</strong> ${priceFormat(bicycle.price)}`]
        for (const elem of elemek) {
            const li = document.createElement("li")
            li.innerHTML = elem
            ul.append(li)
        }
        details.append(ul)
        dialog.showModal()   
    })
    .catch(error => {
        console.log(error)
    });
}

document.getElementById("closeBicycleButton").addEventListener("click", (evt) => {
    const dialog = document.getElementById("bicycleDialog")
    dialog.close()
})

showBicycles()