import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login/Login.jsx'
import Home from './Pages/Home/Home.jsx'
<<<<<<< Updated upstream
=======
import CompanyDetail from './Component/Forms/Partner_Investor_Forms/Company_Details_Form/Comp_Detail_Form.jsx'
import PartnerConnect from './Component/Forms/Partner_Investor_Forms/Partner_Form/Partner_Form.jsx'
import Register from './Pages/Register/Register.jsx'
import InvestorConnect from './Component/Forms/Partner_Investor_Forms/Investor_Form/Investor_Form.jsx'
import About from './Pages/About/About.jsx' 
>>>>>>> Stashed changes

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
      <Route path="/about"
        element={<About />} 
      />
      <Route path="/partner-connect"
        element={<PartnerConnect />}
      />
<<<<<<< Updated upstream

=======
      <Route path="/investor-connect"
        element={<InvestorConnect />}
      />
      <Route
        path='/company-register'
        element={<CompanyDetail />}
      />
>>>>>>> Stashed changes
    </Routes>
  )
}

export default App
