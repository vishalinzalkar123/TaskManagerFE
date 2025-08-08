import "./App.css"
import Navbar from "./components/Navbar"
import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegistrationPage from "./pages/RegistrationPage"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegistrationPage />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </>
  )
}

export default App
