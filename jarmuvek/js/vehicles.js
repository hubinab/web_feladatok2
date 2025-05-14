"use strict"

const street = document.getElementById("street")

const utravele = document.querySelector(".btn-primary")
utravele.addEventListener("click", (evt) => {
    console.log("x")
    evt.preventDefault()
    const n = document.getElementById("n")
    const vehicle = document.getElementById("vehicle")
    for (let index = 0; index < n.value; index++) {
        const img = document.createElement("img")
        img.src = `./img/${vehicle.value}.png`
        img.classList.add("m-2")
        street.append(img)
    }
    const colors = {
        "ambulance": "white",
        "police-car": "#a2cff0",
        "fire-truck": "#f7b7b7",
        "taxi": "#f0f0cd"
    }

    street.style.backgroundColor = colors[vehicle.value]
})

const torol = document.querySelector(".btn-danger")
torol.addEventListener("click", () => {
    street.innerHTML = ""
})