export class Jucio{
    #veredicto //privado
    #sospechosos

    constructor(){
        this.#veredicto = null;
        this.#sospechosos = [];
    }

    agregarSospechoso(sospechoso){
        this.#sospechosos.push(sospechoso); //añade un sospechoso al array
    }

    getSospechosos(){
        return this.#sospechosos;
    }   

    acusar(nombreSospechoso){ //busca el sospechoso por nombre y lo devuelve completo
        let sospechoso = this.#sospechosos.find(sospechoso => sospechoso.nombre === nombreSospechoso);
        return sospechoso
    }

    static determinarVeredicto(sospechosoOK, nombreAcusado, asesino){ //met estatico para generar el veredicto
        if (sospechosoOK){
            return `Has acusado correctamente a ${nombreAcusado}, que es el asesino. ¡Felicidades!`;
        } else {
            return `Has acusado a ${nombreAcusado}, pero el verdadero asesino es ${asesino}. ¡Has fallado!`;
        }
    }
}