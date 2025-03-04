"use strict";

const title = document.querySelector("head>title");
const title_cim = document.createTextNode("Kelly Hősei");
title.append(title_cim)

const h1_cim = document.createTextNode("Kelly Hősei");
const h1 = document.querySelector("#cim");
h1.append(h1_cim)

const eredeticim = document.createTextNode("Kelly's heroes");
const eredeti = document.querySelector("#eredeti");
eredeti.append(eredeticim)

const kep = document.querySelector("body>img:first-child")
kep.setAttribute("src", "kelly_hosei.jpg")

const leiras_szoveg = document.createTextNode("A Kelly hősei (Kelly's Heroes) egy 1970-es években készült háborús vígjáték, amely a második világháború idején játszódik. A film középpontjában egy amerikai katonákból álló csapat áll, akik egy aranykészletet akarnak megszerezni, miközben a háború káoszában navigálnak. A történet humorral és akcióval teli, bemutatva a barátság, a bátorság és a kapzsiság összetett dinamikáját.")
const leiras = document.querySelector("#leiras")
leiras.append(leiras_szoveg)

const hossz_szoveg = document.createTextNode("144 perc")
const hossz = document.querySelector("#hossz")
hossz.append(hossz_szoveg)

const szereplok = ["Clint Eastwood", "Telly Savalas", "Don Rickles", "Donald Sutherland"];

//valami = document.querySelector("body>h2")
const ul = document.querySelector("#szereplok")
for (const szereplo of szereplok) {
    const li = document.createElement("li")
    const tartalom = document.createTextNode(szereplo)
    li.append(tartalom)
    ul.append(li)
}
szereplok.append(ul)

