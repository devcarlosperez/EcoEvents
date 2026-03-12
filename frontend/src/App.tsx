import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { Layout } from './Layout'
import { Login } from './Pages/Login/Login'
import { SignUp } from './Pages/SignUp/SignUp'
import { About } from './Pages/About/About'
import { CreateEvent } from './Pages/CreateEvent/CreateEvent'
import { Event } from './Pages/Event/Event'
import { Events } from './Pages/Events/Events'
import { Admin } from './Pages/Admin/Admin'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<Event/>} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

