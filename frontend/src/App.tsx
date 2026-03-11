import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { Layout } from './Layout'
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
          <Route path="/" element={<About />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/event/:id" element={<Event />} />
          {/*other pages*/}

          </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App

