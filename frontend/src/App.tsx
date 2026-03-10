import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './Components/Header/Header'
import { Footer } from './Components/Footer/Footer'
import { Login } from './Pages/Login/Login'
import { About } from './Pages/About/About'
import { CreateEvent } from './Pages/CreateEvent/CreateEvent'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/About" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-event" element={<CreateEvent />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App


