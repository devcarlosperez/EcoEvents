import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { Login } from './Pages/Login/Login'
import {About} from './Pages/About/About'
import { Layout } from './Layout'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<Layout />}>
          <Route path="/about" element={<About />} />
          {/*other pages*/}

          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

