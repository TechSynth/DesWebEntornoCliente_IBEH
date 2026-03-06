import { useState, useEffect, useRef } from "react"
import datosJSON from "../assets/datosATC.json"
import Message from "./MessageComponent.jsx"
import ButtonOptions from "./ButtonComponent.jsx"
import "./ChatComponent.css"

function Chat() {
    const [mensajes, setMensajes] = useState([])
    const [escribiendo, setEscribiendo] = useState(false)
    const [iniciado, setIniciado] = useState(false)
    const endRef = useRef(null)

    // Mensaje de bienvenida al abrir el chat
    useEffect(() => {
        setMensajes([{ tipo: "asistente", texto: "¡Hola! Soy el asistente de Fisofi. Elige una pregunta" }])
    }, [])

    // Scroll automático al último mensaje
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [mensajes])

    const handleSeleccionar = (item) => {
        setIniciado(true)
        setEscribiendo(true)
        setMensajes((prev) => [...prev, { tipo: "usuario", texto: item.pregunta }])

        setTimeout(() => {
            setMensajes((prev) => [...prev, { tipo: "asistente", texto: item.respuesta }])
            setEscribiendo(false)
        }, 800)
    }

    return (
        <div className="chat">

            <div className="chat-header">
                <p className="chat-nombre">Asistente</p>
            </div>

            <div className="chat-mensajes">
                {mensajes.map((msg, i) => (
                    <Message key={i} tipo={msg.tipo} texto={msg.texto} />
                ))}
                {escribiendo && <p className="chat-escribiendo">...</p>}
                <div ref={endRef} />
            </div>

            <ButtonOptions
                preguntas={datosJSON}
                onSeleccionar={handleSeleccionar}
                deshabilitado={escribiendo}
            />

        </div>
    )
}

export default Chat