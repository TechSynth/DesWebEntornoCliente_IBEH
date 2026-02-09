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

    textoInicial.innerText = `¡Haz clic en ${asesino} para atraparlo!`;

    let img = document.createElement("img");
    img.src = `personajes/${asesino}.gif`;
    img.alt = asesino;
    objetivo.appendChild(img);
});
