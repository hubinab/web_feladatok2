"use strict"
{
    const oldalSzoveg = prompt("Add meg a négyzet oldalát", "0");
    const oldal = parseInt(oldalSzoveg);

    function negyzetKerulet (oldal)
    {
        return 4*oldal
    }

    kiirAlert(`1. feladat, a négyzet kerülete, ${negyzetKerulet(oldal)} méter.`,"success")

    function negyzetTerulet (oldal)
    {
        return oldal*oldal
    }

    kiirAlert(`2. feladat, a négyzet területe, ${negyzetTerulet(oldal)} négyzet méter.`,"warning")
}

{
    const aoldalSzoveg = prompt("Add meg a téglalap elso oldalát", "0");
    const aoldal = parseInt(aoldalSzoveg);

    const boldalSzoveg = prompt("Add meg a téglalap masodik oldalát", "0");
    const boldal = parseInt(boldalSzoveg);

    function teglalapKerulet (a,b)
    {
        return 2*(a+b)
    }

    kiirAlert(`3. feladat, a téglalap kerülete, ${teglalapKerulet(aoldal,boldal)} méter.`,"success")

    function teglalapTerulet (a,b)
    {
        return a*b
    }

    kiirAlert(`4. feladat, a téglalap területe, ${teglalapTerulet(aoldal,boldal)} négyzet méter.`,"warning")
}
{
    const sugarSzoveg = prompt("Add meg a kör sugarát", "0");
    const sugar = parseInt(sugarSzoveg);

    function korKerulet (r)
    {
        return 2*r*Math.PI
    }

    kiirAlert(`5. feladat, a kör kerülete, ${korKerulet(sugar)} méter.`,"success")

    function korTerulet (r)
    {
        return r*r*Math.PI
    }

    kiirAlert(`6. feladat, a kör területe, ${korTerulet(sugar)} négyzet méter.`,"warning")
}
{
    const celsiusSzoveg = prompt("Add meg a celsius fokot", "0");
    const celsius = parseInt(celsiusSzoveg);

    function c2f (c)
    {
        return c*1.8+32
    }

    kiirAlert(`7. feladat, a megadott celsius, ${c2f(celsius)} fahrenheit.`,"success")
}
{
    const fahrenheitSzoveg = prompt("Add meg a fahrenheit fokot", "0");
    const fahrenheit = parseInt(fahrenheitSzoveg);

    function f2c (f)
    {
        return (f-32)/1.8
    }

    kiirAlert(`8. feladat, a megadott fahrenheit, ${f2c(fahrenheit)} celsius.`,"warning")
}
{
    const aSzoveg = prompt("Add meg az elso számot", "0");
    const a = parseInt(aSzoveg);

    const bSzoveg = prompt("Add meg a masodik számot, ami nagyobb, mint az első", "0");
    const b = parseInt(bSzoveg);

    function rand (a,b)
    {
        return Math.floor(Math.random() * (b - a + 1)) + a
    }

    kiirAlert(`9. feladat, a két szám közötti véletlenszerű szám, ${rand(a,b)}.`,"success")
}
{
    const oldalSzoveg = prompt("Add meg a dobókocka oldalszámát", "0");
    const oldal = parseInt(oldalSzoveg);

    function dobokocka (a)
    {
        return Math.floor(Math.random() * (a - 1 + 1)) + 1
    }

    kiirAlert(`10. feladat, a dobásod: ${dobokocka(oldal)}.`,"warning")
}
{
    const szamSzoveg = prompt("Addj meg egy számot", "0");
    const szam = parseInt(szamSzoveg);

    function paros (a)
    {
        if (a % 2 == 0) {return true}
        else {return false}
    }

    if (paros(szam)) 
    {
        kiirAlert(`11. feladat, a megadott szám páros.`,"success")
    }

}
{
    const szamSzoveg = prompt("Addj meg egy számot", "0");
    const szam = parseInt(szamSzoveg);

    function szignum (a)
    {
        if (a == 0) 
        {
            return "nulla"
        }
        else if (a > 0) 
        {
            return "pozitív"
        }
        else 
        {
            return "negatív"
        }
    }

    kiirAlert(`12. feladat, a megadott szám ${szignum(szam)}.`,"warning")

}
{
    const helyezesSzoveg = prompt("Add meg a helyezésed", "");
    const helyezes = parseInt(helyezesSzoveg);

    function olimpiaiPontok (a)
    {
        if (a > 6) 
            return 0;
        else if (a == 1)
            return 7;
        else
            return 7-a;
    }

    kiirAlert(`13. feladat, a pontjaid száma: ${olimpiaiPontok(helyezes)}.`,"success")

}
