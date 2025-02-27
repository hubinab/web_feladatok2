"use strict"
function nbkezedes()
{
    const a = kiolvas("#darab","value")
    for (let index = 1; index <= a; index++) {
        kiirHtml(`${index}. bekezdés`, "div")
    }
}
// Az alábbi kód NEM módosítható!

const gomb = document.getElementById("mehet")
if(gomb && nbkezedes && typeof(nbkezedes) == "function")
{
    gomb.addEventListener("click",(evt) => {
        evt.preventDefault()
        nbkezedes()
    })
}