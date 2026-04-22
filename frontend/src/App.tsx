import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthPage from "./pages/login"
import Dashboard from "./pages/home"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/home" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
} 

export default App