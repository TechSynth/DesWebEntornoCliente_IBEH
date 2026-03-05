import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Navbar from "./components/NavbarComponent.jsx"
import Footer from "./components/FooterComponent.jsx"



function App() {
    return (
        <>
        <Navbar></Navbar>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
        <Footer></Footer>
        </>
    )
}

export default App