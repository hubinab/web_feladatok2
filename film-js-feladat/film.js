"use strict";

const title = document.querySelector("head>title");
const title_cim = document.createTextNode("Kelly Hősei");
title.append(title_cim)

const h1_cim = document.createTextNode("Kelly Hősei");
cim.append(h1_cim)

const eredeti_cim = document.createTextNode("Kelly's heroes");
eredeti.append(eredeti_cim)

const kep = document.querySelector("body>div>div>div>img:first-child")
kep.setAttribute("src", "kelly_hosei.jpg")

const leiras_szoveg = document.createTextNode("A Kelly hősei (Kelly's Heroes) egy 1970-es években készült háborús vígjáték, amely a második világháború idején játszódik. A film középpontjában egy amerikai katonákból álló csapat áll, akik egy aranykészletet akarnak megszerezni, miközben a háború káoszában navigálnak. A történet humorral és akcióval teli, bemutatva a barátság, a bátorság és a kapzsiság összetett dinamikáját.")
leiras.append(leiras_szoveg)

const hossz_szoveg = document.createTextNode("144 perc")
const hossz = document.querySelector("#hossz")
hossz.append(hossz_szoveg)

const sztomb = ["Clint Eastwood", "Telly Savalas", "Don Rickles", "Donald Sutherland"];

const ul = document.querySelector("#szereplok")
for (const szereplo of sztomb) {
    const li = document.createElement("li")
    const tartalom = document.createTextNode(szereplo)
    li.append(tartalom)
    ul.append(li)
}
szereplok.append(ul)
