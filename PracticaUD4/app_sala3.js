"use strict";

import { Juicio } from "./juicio.js";
import { Sospechoso } from "./sospechoso.js";

document.addEventListener("DOMContentLoaded", function () {

    //se sacan los datos de la cookie
    let datosInvestigacion = document.cookie.split("; ");
    let victima = datosInvestigacion.find((item) => item.startsWith("Victima")).split("=")[1];
    let asesino = datosInvestigacion.find((item) => item.startsWith("Sospechoso")).split("=")[1];
    let noAsesinos = datosInvestigacion.find((item) => item.startsWith("NoAsesino")).split("=")[1].split(",");

    let todosSospechosos = [asesino, ...noAsesinos]; //array con todos los sospechosos

    let coartadas = {
        "Teresa": "Estuve en la biblioteca toda la noche.",
        "Carmen": "Estaba durmiendo en mi habitación.",
        "Javier": "Salí a caminar por el jardín.",
        "Joaquin": "Estuve en la cocina haciendome un té.",
        "Ainhoa": "Me quedé en la sala viendo televisión.",
        "Alma": "Estuve en mi cuarto programando toda la noche."
    };

    let juicio = new Juicio(); //nuevo juicio y se añaden los sospechosos

    todosSospechosos.forEach(nombre => { //por cada sospechoso se crea un objeto Sospechoso y se añade al juicio
        let sospechoso = new Sospechoso(
            nombre,
            `personajes/${nombre.toLowerCase()}.gif`,//para el gif
            coartadas[nombre],
            nombre === asesino
        );
        juicio.agregarSospechoso(sospechoso);
    });

    console.log("Sospechosos cargados:", juicio.getSospechosos().length); //deben salir5

});