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

    


    let btnEmpezar = document.getElementById("btnEmpezar");
    let contenedor = document.getElementById("contenedorPrincipal");
    let interrogatorio = document.getElementById("interrogatorio");
    let nombreSel = document.getElementById("nombreSeleccionado");
    let declaracion = document.getElementById("declaracionPista");
    let btnAcusar = document.getElementById("btnAcusar");
    let mensaje = document.getElementById("mensajeResultado");
    let textoResultado = document.getElementById("textoResultado");
    let btnSiguiente = document.getElementById("btnSiguiente");
    let sospechosoActual = null;

    interrogatorio.style.display = "none";
    btnSiguiente.style.display = "none";

    btnEmpezar.addEventListener("click", () => {
        btnEmpezar.style.display = "none";
        //Se barajan los sospechosos porque salia siempre en primera posición el sospechoso
        sospechosos.sort(() => Math.random() - 0.5);
        //Se crean botones por cada uno de los sospechosos
        sospechosos.forEach(nombre => {

            let btn = document.createElement("button");
            btn.innerText = nombre;

            //Añado el boton
            btn.addEventListener("click", () => mostrarPista(nombre));
            contenedor.appendChild(btn);

        });
    });

    function mostrarPista(nombre) {
        let persona = datosInvestigacion[nombre];
        sospechosoActual = persona;
                        
        //Mostrar por consola algún Symbol incluyendo su descripción.
        console.log((sospechosoActual[ROL_SECRETO]))

        

        interrogatorio.style.display = "block";
        nombreSel.innerText = "Interrogando a: " + persona.nombre;
        declaracion.innerText = "Declaración: \"" + persona.declarar() + "\"";
    }
    
    function mostrarObjetos(obj) {
        for (let key in obj) {
            if (typeof obj[key] == "object") {
                console.log( `Propiedad "${key}"s es un objeto con los siguientes valores:`);
                for (let subKey in obj[key]) {
                    console.log(`${subKey}:${obj[key][subKey]}`);
                }
            } else if (typeof obj[key] != "function"){
                console.log(`<br>${key}: ${obj[key]}`);
            }
        }
    }

btnAcusar.addEventListener("click", () => {
        interrogatorio.style.display = "none";
        mensaje.style.display = "block";

        if (sospechosoActual) {

            //Se clona el objeto y se añade la propiedad acusado
            let investigacion = Object.assign({}, sospechosoActual);
            investigacion.acusado = true;

            //se muestra OBJETO CLONADO EN CONSOLA.
            mostrarObjetos(investigacion)


            if (sospechosoActual[ROL_SECRETO] === "CULPABLE") {
                textoResultado.innerText = "\nParece sospechoso.... Lo mejor será hacerle más preguntas a " + sospechosoActual.nombre + ".\n";
                
                    document.cookies = sospechosoActual.nombre;
                    document.cookies= victima;
                if (btnSiguiente) {
                    
                    btnSiguiente.style.display = "block";
                    
                };
            }
            else {
                textoResultado.innerText = "\nParece que " + sospechosoActual.nombre + " no es el asesino. Seguimos investigando.";
            };
        }
    });
    
});
