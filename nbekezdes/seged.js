const container = document.querySelector("#tartalom")

function kiirHtml(tartalom, elem)
{
    const html = document.createElement(elem)
    html.innerText = tartalom
    container.append(html)
}

function kiirAlert(tartalom,tipus = "primary")
{
    const div = document.createElement("div")
    div.classList.add("alert",`alert-${tipus}`)
    div.setAttribute("role", "alert")
    div.innerText = tartalom
    container.append(div)
}

function kiolvas(kijelolo,attributum)
{
    const element = document.querySelector(kijelolo)
    if(!element)
    {
        console.error(`A ${kijelolo} kijelölő által beazonosítható elemnek nem található meg`)
        return null;
    }
    if(!element.hasAttribute(attributum))
    {
        console.error(`A ${kijelolo} kijelölő által beazonosítható elemnek nincs ${attributum} attribútuma`)
        return null;
    }
    return element[attributum]
}

function legorduloErtek(kijelolo)
{
    const element = document.querySelector(kijelolo)
    attributum = "value"
    if(!element)
    {
        console.error(`A ${kijelolo} kijelölő által beazonosítható elemnek nem található meg`)
        return null;
    }
    return element.options[element.selectedIndex].value
}

function kepHozzaad(utvonal)
{
    const img = document.createElement("img")
    img.setAttribute("src",utvonal)
    container.append(img)
}



// lorempicsum

function kepLecserel(utvonal)
{
    document.querySelector("img").setAttribute("src",utvonal)
}

