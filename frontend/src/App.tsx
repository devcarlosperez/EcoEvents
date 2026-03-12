import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { Layout } from './Layout'
import { Login } from './Pages/Login/Login'
import { SignUp } from './Pages/SignUp/SignUp'
import { About } from './Pages/About/About'
import { CreateEvent } from './Pages/CreateEvent/CreateEvent'
import { Event } from './Pages/Event/Event'
import { Admin } from './Pages/Admin/Admin'
import { NotFound } from './Pages/NotFound/NotFound'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
        <Route path="/about" element={<About />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/events/:id" element={<Event/>} />
        <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

