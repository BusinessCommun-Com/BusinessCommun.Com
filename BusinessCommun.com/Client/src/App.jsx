import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login/Login.jsx'
import Home from './Pages/Home/Home.jsx'
import PartnerConnect from './Component/Forms/Partner_Investor_Forms/Partner_Form/Partner_Form.jsx'
import InvestorConnect from './Component/Forms/Partner_Investor_Forms/Investor_Form/Investor_Form.jsx'

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
      <Route path="/investor-connect"
        element={<InvestorConnect />}
      />

    </Routes>
  )
}

export default App
