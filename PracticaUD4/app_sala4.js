"use strict";

document.addEventListener("DOMContentLoaded", function () {
    let asesino;

    let datosInvestigacion = document.cookie.split("; ");
    asesino = datosInvestigacion.find((item) => item.startsWith("Sospechoso")).split("=")[1];

    let textoInicial = document.getElementById("textoInicial");
    let zona = document.getElementById("zona");
    let objetivo = document.getElementById("objetivo");
    let info = document.getElementById("info");
    let codigo = document.getElementById("codigo");
    let mensaje = document.getElementById("mensaje");

    let img = document.createElement("img");
    img.src = `personajes/${asesino}.gif`;
    img.alt = asesino;
    objetivo.appendChild(img);

    let velocidad = 300;
    let intervalo;

    function moverAleatoriamente() {
        let maxX = zona.clientWidth - objetivo.offsetWidth;
        let maxY = zona.clientHeight - objetivo.offsetHeight;
        objetivo.style.left = Math.random() * maxX + "px";
        objetivo.style.top = Math.random() * maxY + "px";
    }

    zona.addEventListener("mouseout", () => {
        info.textContent = "Saliste del área. ¡Vuelve para continuar!";
    });

    zona.addEventListener("blur", () => {
        info.textContent = "Saliste del área. ¡Vuelve para continuar!";
    });

    zona.addEventListener("mouseover", () => {
    info.textContent = `¡Coge a ${asesino} antes de que escape!`;
});

    intervalo = setInterval(moverAleatoriamente, velocidad);

    setTimeout(() => {
        clearInterval(intervalo);
        info.textContent = `¡Parece que ${asesino} se ha cansado! ¡APROVECHA!`;
    }, 5000);

    zona.addEventListener("mousemove", (e) => {
        let rect = zona.getBoundingClientRect();
        let x = Math.floor(e.clientX - rect.left);
        let y = Math.floor(e.clientY - rect.top);
        mensaje.textContent = `Tu posición: (${x}, ${y})`;
    });

    moverAleatoriamente();
});
