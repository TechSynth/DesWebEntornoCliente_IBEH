"use strict";

import { Juicio } from "./juicio.js";
import { Sospechoso } from "./sospechoso.js";

document.addEventListener("DOMContentLoaded", function () {

    let victima, asesino, noAsesinos, todosSospechosos; //variables para los datos de la cookie

    try {  // control de errores, cargar y procesar las cookies
        //se sacan los datos de la cookie
        let datosInvestigacion = document.cookie.split("; ");
        let victima = datosInvestigacion.find((item) => item.startsWith("Victima")).split("=")[1];
        let asesino = datosInvestigacion.find((item) => item.startsWith("Sospechoso")).split("=")[1];
        let noAsesinos = datosInvestigacion.find((item) => item.startsWith("NoAsesino")).split("=")[1].split(",");

        todosSospechosos = [asesino, ...noAsesinos]; //array con todos los sospechosos

        if (!victima || !asesino || !noAsesinos) {
            throw new Error("Datos de investigación incompletos");
        }

        } catch (error) { //si algo falla, hace alert del error y lleva al inicio

        console.error("Error al cargar datos:", error.message);
        alert("No se encontraron datos de la investigación. Vuelve a la sala 1.");
        window.location.href = "index.html";
        return;
    }

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
            `personajes/${nombre.toLowerCase()}.gif`,//image, para el gif
            coartadas[nombre],
            nombre === asesino
        );
        juicio.agregarSospechoso(sospechoso);
    });

    console.log("Sospechosos cargados:", juicio.getSospechosos().length); //deben salir5

    let contenidoPrincipal = document.getElementById("contenidoPrincipal");
      
    function mostrarSeleccionSospechosos() {
        contenidoPrincipal.innerHTML = "";
        
        let titulo = document.createElement("h2");
        titulo.innerText = "Selecciona a quién acusar:";
        contenidoPrincipal.appendChild(titulo);
        
        juicio.getSospechosos().forEach(sospechoso => { //botón por cada sospechoso
            let btn = document.createElement("button");
            btn.innerText = sospechoso.nombre;
            btn.addEventListener("click", () => mostrarConfirmacion(sospechoso));
            contenidoPrincipal.appendChild(btn);
        });
    }

    mostrarSeleccionSospechosos();

    
    function mostrarConfirmacion(sospechoso) {
        contenidoPrincipal.innerHTML = "";//igual que sala 2,limpia el contenido
        
        let titulo = document.createElement("h2");
        titulo.innerText = `¿Acusar a ${sospechoso.nombre}?`;
        contenidoPrincipal.appendChild(titulo);
        
        let img = document.createElement("img"); //misma lógica que sala2.js
        img.src = sospechoso.imagen; //accede a imagen del sospechoso
        img.style.maxWidth = "300px";
        img.style.margin = "20px auto";
        img.style.display = "block";
        contenidoPrincipal.appendChild(img);
        
        let defensa = document.createElement("p");
        defensa.innerText = sospechoso.defender(); //llama al met defender del obj sospechoso
        defensa.style.textAlign = "center";
        contenidoPrincipal.appendChild(defensa);
        
        let btnSi = document.createElement("button");
        btnSi.innerText = "Sí, acusar";
        btnSi.addEventListener("click", () => mostrarVeredicto(sospechoso)); //si se confirma, llama a mostrarVeredicto
        contenidoPrincipal.appendChild(btnSi);
        
        let btnNo = document.createElement("button");
        btnNo.innerText = "Volver";
        btnNo.addEventListener("click", mostrarSeleccionSospechosos); //sino vuelve a la selección
        contenidoPrincipal.appendChild(btnNo);
    }
    
    function mostrarVeredicto(sospechoso) {
        let esAsesino = sospechoso.nombre === asesino;
        let mensaje = Juicio.determinarVeredicto(esAsesino, sospechoso.nombre, asesino); //llama al met estático para generar el mensaje
        
        contenidoPrincipal.innerHTML = "";//limpia el contenido
        
        let titulo = document.createElement("h2");
        titulo.innerText = esAsesino ? "¡CASO RESUELTO!" : "¡ERROR!";
        titulo.style.color = esAsesino ? "green" : "red";
        contenidoPrincipal.appendChild(titulo);
        
        let texto = document.createElement("p");
        texto.innerText = mensaje; //mensaje generado si ha acertado o no
        contenidoPrincipal.appendChild(texto);
        
        let btnReiniciar = document.createElement("button");
        btnReiniciar.innerText = "Jugar de nuevo";

        btnReiniciar.addEventListener("click", () => {//Borra todas las cookies del juego
            document.cookie = "Victima=; max-age=0";
            document.cookie = "Sospechoso=; max-age=0";
            document.cookie = "NoAsesino=; max-age=0";
            window.location.href = "index.html";
        });
        contenidoPrincipal.appendChild(btnReiniciar); //añade el botón de reiniciar
    }
});