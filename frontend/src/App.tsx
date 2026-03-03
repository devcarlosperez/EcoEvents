// note: BrowserRouter/Routes live in react-router-dom for web apps
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Header } from './Components/Header/Header'
import { Login } from './Pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* redirect root to login so something renders at `/` */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        {/* optional catch‑all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


