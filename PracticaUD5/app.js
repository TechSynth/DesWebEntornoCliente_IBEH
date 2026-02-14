/*
Nueva sala para la práctica de la unidad 5.
Consiste en vestir a un moñeco */


document.addEventListener("DOMContentLoaded", () => {
    const armario = document.querySelector('.armario');
    const prendas = document.querySelectorAll('.prenda');
    const inputNombre = document.getElementById('nombrePersonaje');
    const formGuardar = document.getElementById('formGuardar');

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

    // Validación de carácteres alfanuméricos por teclado
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

    formGuardar.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita que la página se recargue

        const nombre = inputNombre.value.trim(); // Recoge lo escrito input y quita espacios

        if (!/^[a-zA-Z0-9]{3,}$/.test(nombre)) { // Misma validación de antes pero con un mínimo de 3.
            alert("Mínimo 3 caracteres alfanuméricos"); // Si no la cumple, muestra error.
            return;
        }

        const outfitGuardado = new CustomEvent("outfitGuardado", { // Evento personalizado
            detail: { nombrePersonaje: nombre } // Se pasará el detail con el nombre guardado del submit
        });

        document.dispatchEvent(outfitGuardado); // Lanza el event personalizado
    });

    document.addEventListener("outfitGuardado", (e) => { // Una vez lanzado saldrá la información
        console.log(`Outfit guardado: ${e.detail.nombrePersonaje}`);
        alert(`Outfit guardado: ${e.detail.nombrePersonaje}`);
    });

    window.addEventListener("resize", () => { // Cuando se redimensiona la ventana, muestra el nuevo tamaño
        console.log(`Ventana redimensionada: ${window.innerWidth}x${window.innerHeight}px`);
    });

    document.body.addEventListener("dblclick", (e) => { // Doble click para devolver la prenda al armario
    if (e.target.classList.contains("prenda")) { // Si el dbclick es a una prenda
        const prenda = e.target;
        
        // Restablecer estilos
        prenda.style.position = ""; // Quita el absolute
        prenda.style.left = ""; // Quita posición horizontal
        prenda.style.top = ""; // Quita posición vertical
        
        // Devolver al armario
        armario.querySelector(".opciones-ropa").append(prenda);
        
        console.log(`Prenda ${prenda.id} devuelta al armario`);
    }
});

});
