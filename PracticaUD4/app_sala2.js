"use strict";

document.addEventListener("DOMContentLoaded", function () {
    //se sacan los datos de la cookie.
    let datosInvestigacion = document.cookie.split("; ");
    let victima = datosInvestigacion[0];
    let sospechoso = datosInvestigacion[1];

    let output = document.getElementById("output");
    let outputPista = document.getElementById("pistas");

    output.innerText += "Victima: " + victima;
    output.innerText += "Sospechoso: " + sospechoso;

    //contador de cuestiones hechas
    let cuestionesHechas = 0;
    let cuestionario = new Map();

    cuestionario.set("¿Cuál era tu relación con la víctima?", [
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
        "Creo que podría ser Javier, lo he visto actuar de manera extraña.",
        "No estoy seguro, pero Ainhoa parecía nerviosa anoche.",
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

    hacerPregunta(preguntas[0]);
    hacerPregunta(preguntas[1]);
    hacerPregunta(preguntas[2]);

});
