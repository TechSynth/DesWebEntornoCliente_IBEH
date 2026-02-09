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
    let jugando = true;

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

    textoInicial.textContent ="Pulsa Z para ralentizar"

    intervalo = setInterval(moverAleatoriamente, velocidad);

    setTimeout(() => {
        clearInterval(intervalo);
        info.textContent = `¡Parece que ${asesino} se ha cansado! ¡APROVECHA!`;
    }, 10000);

    zona.addEventListener("mousemove", (e) => {
        let rect = zona.getBoundingClientRect();
        let x = Math.floor(e.clientX - rect.left);
        let y = Math.floor(e.clientY - rect.top);
        mensaje.textContent = `Tu posición: (${x}, ${y})`;
    });

    objetivo.addEventListener("click", (e) => {
        e.stopPropagation();
        clearInterval(intervalo);
        jugando = false;

        let eventoCaptura = new CustomEvent("asesinoCapturaExitosa", {
            detail: {
                nombre: asesino,
                timestamp: new Date().toLocaleTimeString(),
                detective: codigo.value || "Anónimo",
            },
            bubbles: true,
        });

        objetivo.dispatchEvent(eventoCaptura);
    });

    document.addEventListener("asesinoCapturaExitosa", (e) => {
        let contenidoPrincipal = document.getElementById("contenidoPrincipal");
        contenidoPrincipal.innerHTML = `
        <h1>¡CAPTURADO!</h1>
        <p>${e.detail.nombre} arrestado a las ${e.detail.timestamp}</p>
        <p>Detective: ${e.detail.detective}</p>
        <button id="menu">Volver al menú</button>
        `;

        document.getElementById("menu").addEventListener("click", () => {
            document.cookie = "Victima=; max-age=0";
            document.cookie = "Sospechoso=; max-age=0";
            document.cookie = "NoAsesino=; max-age=0";
            window.location.href = "index.html";
        });
    });

    codigo.addEventListener("keydown", (e) => {
        if (e.key >= "0" && e.key <= "9") {
            e.preventDefault();
            mensaje.textContent = "Solo letras permitidas";
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "z" || e.key === "Z") {
            e.preventDefault();
            clearInterval(intervalo);
            velocidad = 500;
            intervalo = setInterval(moverAleatoriamente, velocidad);
            info.textContent = "¡Tecla Z! El asesino va más lento";
        }
    });

    moverAleatoriamente();
});
