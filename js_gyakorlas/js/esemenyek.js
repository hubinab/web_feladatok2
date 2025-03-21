"use strict"

const colors = {
    "-": {
        "bg": "initial",
        "fg": "initial"
    },
    "blue": {
        "bg": "lightskyblue",
        "fg": "darkblue"
    },
    "black": {
        "bg": "black",
        "fg": "white"
    },
    "red": {
        "bg": "salmon",
        "fg": "darkred"
    }
}

const color = document.getElementById("color")
color.addEventListener("change", function (evt) {
    document.body.style.background = colors[evt.target.value].bg
})

const size = document.getElementById("size")
size.value = 12
size.nextElementSibling.innerText = 12
size.addEventListener("input", function (evt) {
    evt.target.nextElementSibling.innerText = evt.target.value
})

const p = document.body.querySelector("p")
const par_format = document.getElementById("paragraph_format")

function paragraphFormat (evt) {
    if (evt.target.id == "bold") {
        if (evt.target.checked) {
            p.style.fontWeight = "bold"
        }
        else {
            p.style.fontWeight = "normal"
        }
    }
    if (evt.target.id == "italic") {
        if (evt.target.checked) {
            p.style.fontStyle = "italic"
        }
        else {
            p.style.fontStyle = "normal"
        }
    }
    if (evt.target.id == "underline") {
        if (evt.target.checked) {
            p.style.textDecoration = "underline"
        }
        else {
            p.style.textDecoration = "none"
        }
    }
}

par_format.addEventListener("change", paragraphFormat)

function capitalize(evt) {
    if (evt.target.id == "case_none") 
    {
        p.style.textTransform = "none"

    } else if (evt.target.id == "case_lower")
    {
        p.style.textTransform = "lowercase"

    } else if (evt.target.id == "case_upper")
    {
        p.style.textTransform = "uppercase"

    } else if (evt.target.id == "case_capitalize")
    {
        p.style.textTransform = "capitalize"
    }
}

// MI által adott rész, mert nem tudtam, hogy ezt így lehet: 
// 'input[name="case"]'. Pedig biztos tanultuk.
const cases = document.body.querySelectorAll('input[name="case"]')
cases.forEach(case_ => {
    case_.addEventListener("change", capitalize)    
});

const mode = document.getElementById("mode")
mode.addEventListener("change", (evt) => {
    if (evt.target.checked)
    {
        document.body.dataset.bsTheme = "dark"
    } else
    {
        document.body.dataset.bsTheme = "light"
    }
})

function activate(evt) {
    evt.target.style.borderColor = "red"
}

function deactivate(evt) {
    evt.target.style.borderColor = origColor
}

const cards = document.body.querySelectorAll(".card")

const origColor = cards[0].style.borderColor

cards.forEach(card => {
    card.addEventListener("mouseenter",activate)
    card.addEventListener("mouseleave",deactivate)
})

const root = document.documentElement

root.addEventListener("keydown", function(evt) {

    if(evt.ctrlKey && evt.key == "d")
    {
        mode.checked = true
        mode.dispatchEvent(new Event("change"))
    }

    if(evt.ctrlKey && evt.key == "t")
    {
        mode.checked = false
        mode.dispatchEvent(new Event("change"))
    }

    if(evt.ctrlKey && evt.key == "e")
    {
        cases[0].checked = true
        cases[0].dispatchEvent(new Event("change"))
    }

    if(evt.ctrlKey && evt.key == "k")
    {
        cases[1].checked = true
        cases[1].dispatchEvent(new Event("change"))
    }

    if(evt.ctrlKey && evt.key == "n")
    {
        cases[2].checked = true
        cases[2].dispatchEvent(new Event("change"))
    }

    if(evt.ctrlKey && evt.key == "s")
    {
        cases[3].checked = true
        cases[3].dispatchEvent(new Event("change"))
    }
})

