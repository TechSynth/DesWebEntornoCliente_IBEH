"use strict";

document.addEventListener("DOMContentLoaded", function () {
    //se sacan los datos de la cookie. Se añade el de NoAsesino desde la sala1.js 
    let datosInvestigacion = document.cookie.split("; ");
    let victima = datosInvestigacion.find(item => item.startsWith("Victima")).split("=")[1];
    let sospechoso = datosInvestigacion.find(item => item.startsWith("Sospechoso")).split("=")[1];
    let noAsesinos = datosInvestigacion.find(item => item.startsWith("NoAsesino")).split("=")[1].split(",");
    let noAsesinoRandom = noAsesinos[Math.floor(Math.random() * noAsesinos.length)];

    let output = document.getElementById("output");
    let outputPista = document.getElementById("pistas");

    output.innerText += "\nVictima: " + victima;
    output.innerText += "\nSospechoso: " + sospechoso;
    output.innerText += "\nNoAsesinos: " + noAsesinos;

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
        outputPista.innerText += "\n\nPregunta: " + pregunta;
        outputPista.innerText += "\nRespuesta: " + respuesta;
    }

    //se sacan las preguntas del map como array
    let preguntas = Array.from(cuestionario.keys());

    preguntas.forEach(pregunta => {hacerPregunta(pregunta)});

    //se convierten las pistas en array para mostrarlas
    let pistasArray = [...pistas];

    outputPista.innerText += "\n\nPistas recopiladas: ";
    pistasArray.forEach(pista => {outputPista.innerText += "\n" + pista});

});
