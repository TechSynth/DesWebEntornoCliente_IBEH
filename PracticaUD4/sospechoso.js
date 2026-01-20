import Personaje from './personaje.js';

export class Sospechoso extends Personaje { //se extiende de Personaje
    #esAsesino; //pongo privado el atributo esAsesino, para que no se pueda modificar desde fuera de la clase
    
    constructor(nombre, imagen, coartada, esAsesino) {
        super(nombre, imagen); // herencia
        this.coartada = coartada;
        this.#esAsesino = esAsesino;
    }
    
    defender() {
        if (this.#esAsesino) {
            return `¡Esto es ridículo! ${this.coartada} ¡No tenéis pruebas!`;
        } else {
            return `Por favor, yo no fui. ${this.coartada} Debéis creerme.`;
        }
    }
}
