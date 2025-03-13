"use strict"

const discoForm = document.getElementById("disco")

function formSubmit(evt) 
{
    // alert("hahó!")
    evt.preventDefault()
    const ertek = parseInt(contInput.value)

    for (let index = 0; index < ertek; index++) {
        const element = document.createElement("div");
        element.classList.add("col-12","col-sm-4","col-md-3")
        boxesDiv.append(element)
        element.click()
        boxesDiv.addEventListener("click",changeColor)
        element.addEventListener("dblclick",changeBorder)
    }
}

function randomColor() {
    const red = Math.floor(Math.random() * 256)
    const green = Math.floor(Math.random() * 256)
    const blue = Math.floor(Math.random() * 256)
    return `rgb(${red},${green},${blue})`
}

function changeColor(evt) {
    const currentDiv = evt.target
    if (evt.shiftKey) {
        currentDiv.style.backgroundColor = "black"
    }else
    {
        currentDiv.style.backgroundColor = randomColor()
    }
    
}

function randomBorderStyle() {
    const styles = ["solid", "dotted", "double"]
    const randomindex = Math.floor(Math.random() * styles.length)
    return styles[randomindex]
}

function changeBorder(evt) {
    // alert("haho5")
    const currentDiv = evt.target
    currentDiv.style.borderColor = randomColor()
    currentDiv.style.borderStyle = randomBorderStyle()
}

function resetBoxes() {
    boxesDiv.innerHTML = ""
}

function randomBox() {
    const boxes = boxesDiv.querySelectorAll("div")
    const randomindex = Math.floor(Math.random() * boxes.length)
    boxes[randomindex].click()
}

discoForm.addEventListener("submit", formSubmit)
const contInput = document.getElementById("count")
const boxesDiv = document.getElementById("boxes")
const resetButton = document.getElementById("reset")
resetButton.addEventListener("click",resetBoxes)
const randomButton = document.getElementById("random")
randomButton.addEventListener("click",randomBox)