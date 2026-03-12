import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './Pages/Login/Login'
import { SignUp } from './Pages/SignUp/SignUp'
import { Layout } from './Layout'
import { About } from './Pages/About/About'
import { CreateEvent } from './Pages/CreateEvent/CreateEvent'
import { Event } from './Pages/Event/Event'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/about" element={<About />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/events/:id" element={<Event/>} />
          {/*other pages*/}

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

