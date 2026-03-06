import { useState } from "react"
import "./BookPage.css"
import img from "../assets/bookingImage.png"


function BookPage() {
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [enviado, setEnviado] = useState(false)

    const handleEnviar = () => {
        const regex = /^[^\s@]+@[^\s@]+\.(com|es|org|net|io)$/
        if (nombre !== "" && regex.test(email)) {
            setEnviado(true)
        }
    }

    return (
        <div className="book">
            <div className="book-imagen">
                <img src={img} alt="BookImage" />
            </div>
            <div className="book-contenido">
                <h1>Reserva una demo</h1>
                <p>Agenda una llamada de 30 minutos y te mostramos cómo Fisofi puede ayudarte.</p>

                {enviado ? (
                    <p className="book-ok">¡Listo {nombre}! Te escribimos pronto.</p>
                ) : (
                    <div className="book-form">
                        <input type="text" placeholder="Tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        <input type="email" placeholder="Tu email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button onClick={handleEnviar}>Reservar ahora</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BookPage