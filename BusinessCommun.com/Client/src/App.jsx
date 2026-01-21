import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login/Login.jsx'
import Home from './Pages/Home/Home.jsx'
import CompanyDetail from './Component/Forms/Partner_Investor_Forms/Company_Details_Form/Comp_Detail_Form.jsx'
import PartnerConnect from './Component/Forms/Partner_Investor_Forms/Partner_Form/Partner_Form.jsx'
import Register from './Pages/Register/Register.jsx'
import InvestorConnect from './Component/Forms/Partner_Investor_Forms/Investor_Form/Investor_Form.jsx'
import About from './Pages/About/About.jsx' 


import AdminLayout from "./Admin/Layout/AdminLayout";
import Dashboard from "./Admin/Pages/Dashboard";
import Companies from "./Admin/Pages/Companies";
import AdminCompanyProfile from "./Admin/Pages/CompanyProfile";
import PendingRequests from "./Admin/Pages/PendingRequests";
import ApprovedCompanies from "./Admin/Pages/ApprovedCompanies";
import AdminManagement from "./Admin/Pages/AdminManagement";

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

      <Route path="/companies/:id" element={<CompanyProfile />} />
      <Route path="/news/" element={<NewsPage />} />
      <Route path="/contact-us/" element={<ContactUs />} />
      <Route path="
      " element={<PremiumService />} />

       <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />   {/* /admin */}
          <Route path="companies" element={<Companies />} />  {/* /admin/companies */}
          <Route path="company/:id" element={<AdminCompanyProfile />} /> {/* /admin/company/1 */}
          <Route path="pending" element={<PendingRequests />} />  {/* /admin/pending */}
          <Route path="approved" element={<ApprovedCompanies />} /> {/* /admin/approved */}
          <Route path="admins" element={<AdminManagement />} /> {/* /admin/admins */}
        </Route>

    </Routes>
  )
}

export default App;
