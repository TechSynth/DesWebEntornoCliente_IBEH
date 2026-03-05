import { useState } from "react"
import "./Home.css"
import Chat from "../components/ChatComponent.jsx"


function Home() {
    const [chatAbierto, setChatAbierto] = useState(false) //función para actualizar el valor

    return (
        <div className="home">
            <div className="hero">
                <h1>
                    Deja de usar 5 apps<br />
                    <span>Haz crecer tu estudio</span>
                </h1>
                <p>Plataforma todo en uno para estudios de danza, yoga y fitness</p>
                <button onClick={() => setChatAbierto(true)}>
                    Habla con nuestro asistente
                </button>
            </div>

            {chatAbierto ? (
                <div className="modal-fondo" onClick={() => setChatAbierto(false)}>
                    <div className="modal-caja" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-cerrar" onClick={() => setChatAbierto(false)}>✕</button>
                        <Chat />
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default Home