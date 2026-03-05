import { useState } from 'react'
import './Home.css'

function Home() {
    const [chatAbierto, setChatAbierto] = useState(false) //función para actualizar el valor

    return (
        <div className="home">
            <h1>
                Deja de usar 5 apps<br />
                <span>Haz crecer tu estudio</span>
            </h1>
            <p>Plataforma todo en uno para estudios de danza, yoga y fitness</p>
            <button onClick={() => setChatAbierto(true)}>
                Habla con nuestro asistente
            </button>

            {chatAbierto && ( //Renderizado condicional
                <p></p>
            )}
        </div>
    )
}

export default Home