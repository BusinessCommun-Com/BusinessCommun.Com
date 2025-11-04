import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login/Login.jsx'
import Home from './Pages/Home/Home.jsx'

function App() {

  return (
    <Routes>
      <Route
        path='/'
        element={<Login />}
      />
      <Route
        path='/home'
        element={<Home />}
      />
      <Route path="/partner-connect"
        element={<PartnerConnect />}
      />

    </Routes>
  )
}

export default App
