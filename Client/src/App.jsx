import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import Home from './Pages/Home.jsx'
function App() {
  return (
   <BrowserRouter>
   <Routes>
   <Route path='/' element={<Home/>}  />
   <Route path='/login' element={<Login/>}  />
   <Route path='/register' element={<Register/>}  />


   </Routes>
   </BrowserRouter>
  )
}

export default App
