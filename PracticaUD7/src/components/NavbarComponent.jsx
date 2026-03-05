import { Link } from "react-router-dom"
import "./NavbarComponent.css"
import logo from "../assets/logoFisofi.png"


function Navbar() {
    return (
        <nav className="navbar">
            <span className="navbar-logo">
                <Link to="/">
                    <img src={logo} alt="Fisofi" />
                </Link>
            </span>
            <div className="navbar-links">
                <Link to="/book" className="navbar-cta">Reservar demo</Link>
            </div>
        </nav>
    )
}

export default Navbar