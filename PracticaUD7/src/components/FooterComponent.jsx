import { useState } from "react"
import "./FooterComponent.css"
import logo from '../assets/logoFisofi.png'

function Footer() {
    const [email, setEmail] = useState("") // guarda el email del input
    const [enviado, setEnviado] = useState(false) // controla si se ha enviado

    const handleEnviar = () => {
        const regex = /^[^\s@]+@[^\s@]+\.(com|es|org)$/ // comprobacion previa
        if (regex.test(email)) {
            setEnviado(true)
            setEmail("")
        }
    }

    return (
        <footer className="footer">
            <img src={logo} alt="Fisofi" className="footer-logo" />

            {enviado ? ( // renderizado condicional
                <p className="footer-gracias">¡Gracias! Te contactamos pronto</p>
            ) : (
                <div className="footer-form">
                    <input
                        type="email"
                        placeholder="Tu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={handleEnviar}>Conectar con expertos</button>
                </div>
            )}

            <p className="footer-copy">© 2025 Fisofi</p>
        </footer>
    )
}

export default Footer