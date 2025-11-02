import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login/Login.jsx'

function App() {

  return (
    <Routes>
      <Route
        path='/'
        element = {<Login/>}
      />
    </Routes>
  )
}

export default App
