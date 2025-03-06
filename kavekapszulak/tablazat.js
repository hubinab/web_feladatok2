"use strict"

function egysor (detail, type) {

    const sor = document.createElement("tr")

    for(let col in detail) {
        const oszlop = document.createElement(type)
        if (type == "td" && col == "Price")
        {
            oszlop.append(detail[col], " Ft")
        }
        else{
            oszlop.append(detail[col])
        }
        sor.append(oszlop)
    }

    if (type == "td") {
        const oszlop = document.createElement(type)
        oszlop.append(detail.Price/detail.Qty, " Ft")
        sor.append(oszlop)
    }

    return sor
}

function tabla (elements, head) {

    const tabla = document.createElement("table")
    const fej = document.createElement("thead")

    fej.append(egysor(head, "th"))
    tabla.append(fej)

    const tablatest = document.createElement("tbody")

    for(const elem of elements){
        tablatest.append(egysor(elem, "td"))
    }

    tabla.append(tablatest)

    return tabla
    
}

const fej = 
{
    SKU: "SKU",
    Name: "Name",
    Type: "Type",
    Price: "Price",
    Qty: "Qty",
    Ppc: "Price per capsule"
}

const cim = document.createElement("h1")
cim.append("Kávékapszulák táblázat")
document.querySelector("body").append(cim)

const kapszulak = tabla(kavekapszulak, fej)

kapszulak.classList.add("table")
kapszulak.classList.add("table-striped")

console.log(kapszulak)

document.querySelector("body").append(kapszulak)