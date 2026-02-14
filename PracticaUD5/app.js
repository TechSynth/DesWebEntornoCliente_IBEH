/*
Nueva sala para la práctica de la unidad 5.
Consiste en vestir a un moñeco */


document.addEventListener("DOMContentLoaded", () => {
    const armario = document.querySelector('.armario');
    const prendas = document.querySelectorAll('.prenda');
    const inputNombre = document.getElementById('nombrePersonaje');

    let prendaSeleccionada = null;

    // Uso de delegación de eventos
    armario.addEventListener('click', (e) => {
        // Se comprueba si la imagen seleccionada es de prenda
        if (e.target.classList.contains('prenda')) {
            // Guardo id, ancho y alto de la prenda seleccionada
            prendaSeleccionada = { // Objeto con la información de la prenda seleccionada
                id: e.target.id,
                ancho: e.target.offsetWidth,
                alto: e.target.offsetHeight
            }

            console.log(`Seleccionada prenda: ${prendaSeleccionada.id}. Tamaño: ${prendaSeleccionada.ancho}x${prendaSeleccionada.alto}px`);
        }
        else {
            console.log("No has seleccionado nada del armario!");
        }
    });

    // Evento click en body para propagación
    document.body.addEventListener("click", () => {
        console.log("Click en el body");
    });

    prendas.forEach(prenda => {
        prenda.onmousedown = function (event) {

            // Validacion de teclado, solo podrá arrastrar con CTRL presionado
            if (!event.ctrlKey) {
                console.log("Debes tener CTRL presionado para arrastrar");
                return;
            }

            prenda.style.position = "absolute"; //Para que lo ponga donde quiera el usuario
            document.body.append(prenda);

            function moveAt(pageX, pageY) { // Funcion para mover la prenda al centro del ratón
                prenda.style.left = pageX - prenda.offsetWidth / 2 + "px";
                prenda.style.top = pageY - prenda.offsetHeight / 2 + "px";
            }

            moveAt(event.pageX, event.pageY); // Posiciona la prenda inicialmente donde está el ratón, sino, aparece en la esquina inferior

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            // Arrastrar y soltar
            document.addEventListener("mousemove", onMouseMove); // Mueve la prenda con el ratón

            prenda.onmouseup = function (event) { // Una vez se suelte el ratón se elimina el movimiento y se deja la prenda en la posición final
                document.removeEventListener("mousemove", onMouseMove);
                prenda.onmouseup = null;

                prenda.style.left = event.pageX - prenda.offsetWidth / 2 + "px";
                prenda.style.top = event.pageY - prenda.offsetHeight / 2 + "px";
                
                // Para propagacion, si se hace click en la prenda, no se propaga al body
                prenda.addEventListener("click", (e) => {
                    e.stopPropagation(); // Evita que el click se propague al body
                    console.log(`Click en prenda colocada ${prenda.id} - propagación detenida`);
                });
            };
            
        };

        prenda.ondragstart = function () { // Para que no se duplique la prenda al arrastrar
            return false;
        };
    });

    // Validación de carácteres alfanuméricos 
    inputNombre.addEventListener("keypress", (e) => {
        const caracter = e.key; // Que tecla se ha apretado

        // Valida que solo sea letra (a-z, A-Z) o número (0-9)
        const esAlfanumerico = /^[a-zA-Z0-9]$/.test(caracter); // Devuelve true si es alfanum

        if (esAlfanumerico) {
            console.log(`Has introducido el caracter "${caracter}"`);
            
        }
        else {
            e.preventDefault(); // Evita que se escriba el caracter
            console.log("Solo letras y números");
        }
    });
    
});
