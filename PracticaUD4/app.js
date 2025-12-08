"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const nombres = ["Teresa", "Carmen", "Javier", "Joaquin", "Ainhoa", "Alma"];
    const zonas = ["Casa de Campo", "Biblioteca", "Cocina", "Jardín", "Baño", "Sala de Estar"];

    //se ordena el array. https://javascript.info/array-methods Shuffle an array
    nombres.sort(() => Math.random() - 0.5);

    const victima = nombres[0];
    const asesinoReal = nombres[1];
    const sospechosos = nombres.slice(1);
    const noAsesino = nombres.slice(2);

    document.getElementById("victima").innerText = victima;

    //Symbol
    const ROL_SECRETO = Symbol("rol");

    const datosInvestigacion = {};

    sospechosos.forEach(nombre => {

        datosInvestigacion[nombre] = {
            nombre: nombre,

            //Obj anidado, se usará en la siguiente sala
            detalles: {
                coartadaDebil: nombre === asesinoReal,
                ubicacionPrevia: zonas[Math.floor(Math.random() * zonas.length)]
            },

            [ROL_SECRETO]: nombre === asesinoReal ? "CULPABLE" : "INOCENTE",

            declarar: function () {
                if (this[ROL_SECRETO] === "CULPABLE") {
                    return "Yo... MmMM ... estuve en el baño toda la noche. ¡Lo juro!";
                } else {
                    return "Estuve en la biblioteca leyendo un libro. Pobre" + victima + "...";
                }
            }
        };
    });
});
