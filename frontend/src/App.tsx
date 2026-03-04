import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { Header } from './Components/Header/Header'
import { Login } from './Pages/Login/Login'
import{About} from './Pages/About/About'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/About" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


