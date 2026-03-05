import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Navbar from "./components/NavbarComponent.jsx"


function App() {
    return (
        <>
        <Navbar></Navbar>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
        </>
    )
}

export default App