import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { Login } from './Pages/Login/Login'
import { Signin } from './Pages/SignIn/SignIn'

function App() {

  return (
    <BrowserRouter>
           <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


