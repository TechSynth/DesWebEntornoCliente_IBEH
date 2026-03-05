import "./ButtonComponent.css"

function ButtonOptions({ preguntas, onSeleccionar, deshabilitado }) {
    return (
        <div className="opciones">
            <p className="opciones-titulo">Elige una pregunta:</p>
            <div className="opciones-grid">
                {preguntas.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => onSeleccionar(item)}
                        disabled={deshabilitado}
                        className="opcion-btn"
                    >
                        {item.pregunta}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ButtonOptions