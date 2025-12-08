"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const nombres = ["Teresa", "Carmen", "Javier", "Joaquin", "Ainhoa", "Alma"];

    //se ordena el array. https://javascript.info/array-methods Shuffle an array
    nombres.sort(() => Math.random() - 0.5);

    const victima = nombres[0];
    const asesinoReal = nombres[1];
    const sospechosos=nombres.slice(1);
    const noAsesino = nombres.slice(2);

    document.getElementById("victima").innerText = victima;

    //Symbol
    const ROL_SECRETO = Symbol("rol");
});
