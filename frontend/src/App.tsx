import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './Pages/Login/Login'
import { SignUp } from './Pages/SignUp/SignUp'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


