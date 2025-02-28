"use strict"
function general()
{
    const id = legorduloErtek("#id")
    console.log(id)
    if (id == -1)
    {
        console.log("Kérem válasszon képet!")
        alert("Kérem válasszon képet!")
        return
    }
    const wi = kiolvas("#width","value");
    console.log(wi)

    const he = kiolvas("#height","value");
    console.log(he)

    kepLecserel(`https://picsum.photos/id/${id}/${wi}/${he}`)
}

// Az alábbi kód NEM módosítható!

const gomb = document.getElementById("generalas")
if(gomb && general && typeof(general) == "function")
{
    gomb.addEventListener("click",(evt) => {
        evt.preventDefault()
        general()
    })
}