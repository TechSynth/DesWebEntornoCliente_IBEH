import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import BookPage from './pages/BookPage.jsx'
import Navbar from "./components/NavbarComponent.jsx"
import Footer from "./components/FooterComponent.jsx"



function App() {
    return (
        <>
        <Navbar></Navbar>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book" element={<BookPage />} />
        </Routes>
        <Footer></Footer>
        </>
    )
}

export default App