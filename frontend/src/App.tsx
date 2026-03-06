<<<<<<< HEAD

=======
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { Header } from './Components/Header/Header'
import { Footer } from './Components/Footer/Footer'
import { Login } from './Pages/Login/Login'
import{About} from './Pages/About/About'
>>>>>>> dafbb8d5e17c1c9814ea9303d7cce4a0be802d24

function App() {


  return (
<<<<<<< HEAD
    <>
    </>
=======
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/About" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
>>>>>>> dafbb8d5e17c1c9814ea9303d7cce4a0be802d24
  )
}

export default App


