"use strict";

document.addEventListener("DOMContentLoaded", function () {
    //se sacan los datos de la cookie. Se añade el de NoAsesino desde la sala1.js
    let datosInvestigacion = document.cookie.split("; ");
    let victima = datosInvestigacion.find((item) => item.startsWith("Victima")).split("=")[1];
    let sospechoso = datosInvestigacion.find((item) => item.startsWith("Sospechoso")).split("=")[1];
    let noAsesinos = datosInvestigacion.find((item) => item.startsWith("NoAsesino")).split("=")[1].split(",");
    let noAsesinoRandom = noAsesinos[Math.floor(Math.random() * noAsesinos.length)];

    let textoInicial = document.getElementById("textoInicial");
    let btnPregunta1 = document.getElementById("primeraPregunta");
    let btnPregunta2 = document.getElementById("segundaPregunta");
    let btnPregunta3 = document.getElementById("terceraPregunta");
    let outputPregunta = document.getElementById("pregunta");
    let outputRespuesta = document.getElementById("respuesta");
    let outputPistas = document.getElementById("pistas");

    textoInicial.innerText +="\nTenemos unas preguntas adicionales que nos gustaría que nos respondieses por favor " +victima;
    //output.innerText += "\nSospechoso: " + sospechoso;
    //output.innerText += "\nNoAsesinos: " + noAsesinos;

    //contador de cuestiones hechas
    let cuestionesHechas = 0;
    let cuestionario = new Map();

    cuestionario.set("¿Cuál era tu relación con " + victima + "?", [
        "Éramos buenos amigos desde la infancia.",
        "Solo éramos conocidos, no teníamos mucha relación.",
        "No nos llevábamos bien, teníamos varios desacuerdos.",
    ]);

    cuestionario.set("¿Has notado algo extraño últimamente?", [
        "No, todo ha estado normal para mí.",
        "Sí, he visto a alguien merodeando por la casa.",
        "He escuchado ruidos extraños por la noche.",
    ]);

    cuestionario.set("¿De quíen sospechas?", [
        "Creo que podría ser " + noAsesinoRandom + ", actuaba de manera extraña.",
        "No lo sé aún, pero " + noAsesinoRandom + " estaba de los nervios anoche.",
        "No tengo sospechas concretas, todos parecían normales.",
    ]);

    let pistas = new Set();

    function hacerPregunta(pregunta) {
        let respuestas = cuestionario.get(pregunta);

        //respuesta aleatoria entre las posibles del map
        let respuesta = respuestas[Math.floor(Math.random() * respuestas.length)];

        pistas.add(respuesta);
        cuestionesHechas++;

        //pruebas de output
        outputPregunta.innerText = "\n\nPregunta: " + pregunta;
        outputRespuesta.innerText = "\nRespuesta: " + respuesta;

        outputPistas.innerText = "\n\nPistas recopiladas: ";
        mostrarPistas();

        //display none de texto de preguntas una vez se han hecho las 3
        if (cuestionesHechas === 3) {
            outputPregunta.style.display = "none";
            outputRespuesta.style.display = "none";
            mostrarBoton();

        }
    }

    //se sacan las preguntas del map como array
    let preguntas = Array.from(cuestionario.keys());

    //preguntas.forEach(pregunta => {hacerPregunta(pregunta)});

    btnPregunta1.addEventListener("click", () => {
        btnPregunta1.style.display = "none";
        hacerPregunta(preguntas[0]);
    });

    btnPregunta2.addEventListener("click", () => {
        btnPregunta2.style.display = "none";
        hacerPregunta(preguntas[1]);
    });

    btnPregunta3.addEventListener("click", () => {
        btnPregunta3.style.display = "none";
        hacerPregunta(preguntas[2]);
    });

    //se convierten las pistas en array para mostrarlas
    function mostrarPistas() {
        let pistasArray = [...pistas];

        pistasArray.forEach((pista) => {
            outputPistas.innerText += "\n" + pista;
        });
    };

    function mostrarBoton(){
        let btnContinuar = document.createElement("button");
        outputPistas.innerText += "\n\n"
        btnContinuar.innerText = "Continuar";
        btnContinuar.id = "btnContinuar";
        
        btnContinuar.addEventListener("click", () => {
            window.location.href = "sala3.html";
        });
        outputPistas.appendChild(btnContinuar);
    }



    //SEGUNDA ENTREGA PARCIAL, propiedades con desestructuración

    let [pregunta1,respuesta2,respuesta3]=preguntas
    console.log(pregunta1)
    console.log(respuesta2)
    console.log(respuesta3)

    //recorrer los valores del map cuestionario
    for (let opciones of cuestionario.values()) {
        console.log(opciones);
    };


    //array sin modificación

    console.log("Array sin modificación: " +document.cookie)
    console.log("Array con modificación, seleccionan solo NO asesinos: "+noAsesinos)


});
