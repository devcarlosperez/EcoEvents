import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { Layout } from './Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './Components/Header/Header'
import { Footer } from './Components/Footer/Footer'
import { Login } from './Pages/Login/Login'
import { About } from './Pages/About/About'
import { CreateEvent } from './Pages/CreateEvent/CreateEvent'
import { Event } from './Pages/Event/Event'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<Layout />}>
          <Route path="/about" element={<About />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/event/:id" element={<Event />} />
          {/*other pages*/}

          </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App

