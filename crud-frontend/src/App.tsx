import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import Users from './Users'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
// import Home from './pages/Home'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Users />} />
        <Route path='/create' element={<CreateUser />} />
        <Route path='/update/:id' element={<UpdateUser />} />
       
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
