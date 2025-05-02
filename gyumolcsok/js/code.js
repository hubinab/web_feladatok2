"use strict"

const body = document.querySelector("body")
const person = document.getElementById("person")
const ultetesBtn = document.getElementById("ultetes")
const qty = document.getElementById("qty")
const fruit = document.getElementById("fruit")

person.addEventListener("change", (evt) => {
    if (person.value == "laci") {
        body.style.backgroundColor = "lightskyblue"
    }
    else {
        body.style.backgroundColor = "salmon"
    }
})

ultetesBtn.addEventListener("click", (evt) => {
    evt.preventDefault()
    for (let index = 0; index < qty.value; index++) {
        const img = document.createElement("img")
        img.src = `./img/${fruit.value}.png`
        document.getElementById(person.value).append(img)
    }
})