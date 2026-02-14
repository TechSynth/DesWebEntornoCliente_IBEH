/*
Nueva sala para la práctica de la unidad 5.
Consiste en vestir a un moñeco */


document.addEventListener("DOMContentLoaded", () => {
    const armario = document.querySelector('.armario');

    // Uso de delegación de eventos
    armario.addEventListener('click', (e) => {
        // Se comprueba si la imagen seleccionada es de prenda
        if (e.target.classList.contains('prenda')) {
            // Para saber cual es su tamaño
            const ancho = e.target.offsetWidth;
            const alto = e.target.offsetHeight;

            console.log(`Seleccionada prenda: ${e.target.id}. Tamaño: ${ancho}x${alto}px`);
        }
        else {
            console.log("No has seleccionado nada del armario!");
        }
    });
});