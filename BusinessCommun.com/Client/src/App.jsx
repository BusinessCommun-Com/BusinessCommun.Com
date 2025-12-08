import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login/Login.jsx'
import Home from './Pages/Home/Home.jsx'
import CompanyDetail from './Component/Forms/Partner_Investor_Forms/Company_Details_Form/Comp_Detail_Form.jsx'
import PartnerConnect from './Component/Forms/Partner_Investor_Forms/Partner_Form/Partner_Form.jsx'
import Register from './Pages/Register/Register.jsx'
import InvestorConnect from './Component/Forms/Partner_Investor_Forms/Investor_Form/Investor_Form.jsx'
import About from './Pages/About/About.jsx' 


function App() {

  const { step } = useMultiStepForm();

  // Multi-step pages
  const pages = [
    <CompanyDetail />,
    <CompanyPitch />,
    <PartnerConnect />,
    <InvestorConnect />
  ];

  return (
    <Routes>
      <Route
        path='/'
        element={<Login />}
      />
      <Route
        path='/register'
        element={<Register />}
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


      <Route
        path="/company-registration/*"
        element={
          <div className="root">
            <div id="main-wrapper" className="container">
              <ProgressIndicator />
              {pages[step]}
            </div>
          </div>
        }
      />
      <Route
        path="/companies/:id"
        element={<CompanyProfile />}
      />
      <Route
        path="/contact-us/"
        element={<ContactUs />}
      />
      <Route
        path='/premium-service'
        element = {<PremiumService/>}
      />
    </Routes>
  )
}

export default App;
