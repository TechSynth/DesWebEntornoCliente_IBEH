import "./MessageComponent.css"

function Message({ tipo, texto }) {
    const esUsuario = tipo === "usuario"

    return (
        <div className={`mensaje ${esUsuario ? "mensaje-usuario" : "mensaje-asistente"}`}>
            <p>{texto}</p>
            <span className="mensaje-etiqueta">{esUsuario ? "Cliente" : "Asistente"}</span>
        </div>
    )
}

export default Message