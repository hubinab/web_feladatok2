"use strict"

{/* <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div> */}

function cardlist (kapszulakjson) {

    for (let kapszula in kapszulakjson) {

        const col = document.createElement("div")
        col.classList.add("col-12", "col-md-6", "col-lg-3", "my-2")
        document.querySelector(".row").append(col)

        const card = document.createElement("div")
        card.classList.add("card", "h-100", "mx-1")
        //card.style.width = "18rem"
        col.append(card)

        const img = document.createElement("img")
        img.classList.add("card-img-top")
        img.setAttribute("src", kapszulakjson[kapszula].img)
        card.append(img)

        const cardbody = document.createElement("div")
        cardbody.classList.add("card-body")
        card.append(cardbody)

        const h5 = document.createElement("h5")
        h5.classList.add("cardtitle")
        h5.append(document.createTextNode(kapszulakjson[kapszula].cim))
        cardbody.append(h5)

        const p = document.createElement("p")
        p.classList.add("card-tittle")
        p.append(document.createTextNode(kapszulakjson[kapszula].leiras))
        cardbody.append(p)
    }
} 

const kavekapszulak = [
    {
        img: "./img/caffe-crema-colombia.jpg",
        cim: "Caffè Crema Colombia",
        leiras: "karakteres zu testes finom kávé zöld citromra emlékezteto izjegyekkel"
    },
    {
        img: "./img/caffe-crema-india.jpg",
        cim: "Caffè Crema India",
        leiras: "Harmonikus, kiegyensúlyozott kávé Mézre és malátára emlékezteto aromával"
    },
    {
        img: "./img/uj-cafissimo-for-blackn-white.jpg",
        cim: "Black'n White",
        leiras: "Tele harmóniával Eroteljes Ízvilágú espresszó Kissé kesernyés, diós ízekkel"
    },
    {
        img: "./img/espresso-brasil.jpg",
        cim: "Espresso Brasil",
        leiras: "Tele harmóniával Eroteljes ízvilágú espresszo Kissé kesernyés, diós ízekkel"
    }
]

const cim = document.createElement("h1")
cim.append("Kávékapszulák leírása")
document.querySelector("body").append(cim)

const container = document.createElement("div")
container.classList.add(".container", "mb-2")
document.querySelector("body").append(container)

const row = document.createElement("div")
row.classList.add("row")
container.append(row)

cardlist(kavekapszulak)


